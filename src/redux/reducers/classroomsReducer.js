import { LIST_CLASSROOMS, USER_SIGNED_OUT } from '../constants';

// definindo estado array vazio.
const INITIAL_STATE_CLASSROOMS = [];

export default (state = INITIAL_STATE_CLASSROOMS, action) => {
    switch (action.type) {
        case LIST_CLASSROOMS:
            return action.payload;
        case USER_SIGNED_OUT:
            return INITIAL_STATE_CLASSROOMS;
        default:
            return state;
    }
}