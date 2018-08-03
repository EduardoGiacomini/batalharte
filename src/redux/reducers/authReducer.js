import { USER_LOGGED, USER_LOGOUT } from '../constants/constants';

// definindo estado inicial nulo
const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGGED:
            return action.payload;
        case USER_LOGOUT:
            return action.payload;
        default:
            return state;
    }
}
