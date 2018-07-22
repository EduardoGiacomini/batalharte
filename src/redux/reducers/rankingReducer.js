import { LIST_USERS } from '../constants/constants';

// definindo estado inicial vetor vazio
const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_USERS:
            return { ...state, users: action.payload };
        default:
            return state;
    }
}