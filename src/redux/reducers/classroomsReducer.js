import { LIST_CLASSROOMS } from '../constants';

// definindo estado array vazio.
const INITIAL_STATE_CLASSROOMS = [];

export default (state = INITIAL_STATE_CLASSROOMS, action) => {
    switch (action.type) {
        case LIST_CLASSROOMS:
            return action.payload;
        default:
            return state;
    }
}