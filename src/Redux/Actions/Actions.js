import ACTIONTYPE from "./ActionType";

export const addQuiz = (data) => ({
  type: ACTIONTYPE.ADDQUIZ,
  payload: data,
});

export const toggleActive = (id) => ({
  type: ACTIONTYPE.TOGGLEACTIVE,
  payload: id,
});

export const deleteQuiz = (id) => ({
  type: ACTIONTYPE.DELETEQUIZ,
  payload: id,
});

export const playQuiz = (quizData) => ({
  type: ACTIONTYPE.PLAYQUIZ,
  payload: quizData, // Now sending full quiz data instead of just ID
});

export const getName = (name) => ({
  type: ACTIONTYPE.GETNAME,
  payload: name,
});

export const getAnswer = (ans) => ({
  type: ACTIONTYPE.GETANSWER,
  payload: ans,
});

export const resetQuiz = () => ({
  type: ACTIONTYPE.RESET,
});
