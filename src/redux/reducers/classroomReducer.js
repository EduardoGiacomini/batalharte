import { LIST_CLASSROOMS } from '../constants';

// definindo estado inicial nulo
const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_CLASSROOMS:
            return action.payload;
        default:
            return state;
    }
}
