import { LIST_CLASSROOM, RESET_CLASSROOM, USER_SIGNED_OUT } from '../constants';

// definindo estado array vazio.
const INITIAL_STATE_CLASSROOM = null;

export default (state = INITIAL_STATE_CLASSROOM, action) => {
    switch (action.type) {
        case LIST_CLASSROOM:
            return action.payload;
        case RESET_CLASSROOM:
            return action.payload;
        case USER_SIGNED_OUT:
            return INITIAL_STATE_CLASSROOM;
        default:
            return state;
    }
}