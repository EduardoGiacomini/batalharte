import { LIST_QUIZZES, LIST_QUESTIONS } from '../constants/constants';

// definindo estado inicial vetor vazio
const INITIAL_STATE_QUIZZES_REDUCER = [];

export const quizzesReducer = (state = INITIAL_STATE_QUIZZES_REDUCER, action) => {
    switch (action.type) {
        case LIST_QUIZZES:
            return { ...state, quizzes: action.payload };
        default:
            return state;
    }
}

// definindo estado inicial vetor vazio
const INITIAL_STATE_QUESTIONS_REDUCER = [];

export const questionsReducer = (state = INITIAL_STATE_QUESTIONS_REDUCER, action) => {
    switch (action.type) {
        case LIST_QUESTIONS:
            return { ...state, questions: action.payload };
        default:
            return state;
    }
}