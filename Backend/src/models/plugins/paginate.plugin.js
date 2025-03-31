/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - MongoDB filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria in format: sortField:(desc|asc)
   * @param {string} [options.populate] - Populate fields (comma-separated)
   * @param {number} [options.limit] - Max results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options) {
    let sort = '-createdAt'; // Default sort to latest first

    if (options.sortBy) {
      try {
        const sortingCriteria = [];
        options.sortBy.split(',').forEach((sortOption) => {
          const [key, order] = sortOption.split(':');
          sortingCriteria.push((order === 'desc' ? '-' : '') + key);
        });
        sort = sortingCriteria.join(' ');
      } catch (error) {
        console.warn('Invalid sortBy format:', options.sortBy);
      }
    }

    const limit = Math.max(parseInt(options.limit, 10) || 10, 1);
    const page = Math.max(parseInt(options.page, 10) || 1, 1);
    const skip = (page - 1) * limit;

    const countPromise = Object.keys(filter).length
      ? this.countDocuments(filter).exec()
      : this.estimatedDocumentCount().exec();

    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then(([totalResults, results]) => {
      return {
        results,
        page,
        limit,
        totalPages: Math.ceil(totalResults / limit),
        totalResults,
      };
    });
  };
};

module.exports = paginate;
