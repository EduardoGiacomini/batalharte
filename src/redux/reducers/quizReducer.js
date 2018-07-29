import { LIST_QUIZ} from '../constants/constants';

// definindo estado inicial vetor vazio
const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_QUIZ:
            return { ...state, quiz: action.payload };
        default:
            return state;
    }
}