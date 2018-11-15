import { USER_SIGNED_IN, USER_SIGNED_OUT } from '../constants';

// definindo estado inicial nulo
const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_SIGNED_IN:
            return action.payload;
        case USER_SIGNED_OUT:
            return action.payload;
        default:
            return state;
    }
}
