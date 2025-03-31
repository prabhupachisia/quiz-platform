import ACTIONTYPE from "../Actions/ActionType";

const initialState = {
  quiz: [],
  name: "",
  playQuiz: null,  // Now playQuiz is an object, not an array
  answers: [],
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ACTIONTYPE.ADDQUIZ:
      return { ...state, quiz: [...state.quiz, actions.payload] };

    case ACTIONTYPE.TOGGLEACTIVE:
      return {
        ...state,
        quiz: state.quiz.map((el) =>
          el.id === actions.payload ? { ...el, isActive: !el.isActive } : el
        ),
      };

    case ACTIONTYPE.DELETEQUIZ:
      return {
        ...state,
        quiz: state.quiz.filter((el) => el.id !== actions.payload),
      };

    case ACTIONTYPE.GETNAME:
      return {
        ...state,
        name: actions.payload,
      };

    case ACTIONTYPE.PLAYQUIZ:
      return {
        ...state,
        playQuiz: { ...actions.payload, quizId: actions.payload.quizId || actions.payload._id },
      };

    case ACTIONTYPE.GETANSWER:
      return {
        ...state,
        answers: [...state.answers, actions.payload],
      };

    case ACTIONTYPE.RESET:
      return {
        ...state,
        name: "",
        playQuiz: null,
        answers: [],
      };

    default:
      return state;
  }
};

export default reducer; 
