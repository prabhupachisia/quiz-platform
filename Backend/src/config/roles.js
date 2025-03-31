const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
  teacher: [],
  student: ['submitScore'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
