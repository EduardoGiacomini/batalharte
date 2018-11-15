import { LIST_QUESTIONS, RESET_CLASSROOM, USER_SIGNED_OUT } from '../constants';

// definindo estado array vazio.
const INITIAL_STATE_QUESTIONS = [];

export default (state = INITIAL_STATE_QUESTIONS, action) => {
    switch (action.type) {
        case LIST_QUESTIONS:
            return action.payload;
        case RESET_CLASSROOM:
            return INITIAL_STATE_QUESTIONS;
        case USER_SIGNED_OUT:
            return INITIAL_STATE_QUESTIONS;
        default:
            return state;
    }
}