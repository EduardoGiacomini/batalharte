import { combineReducers } from 'redux';
// reducers
import AuthReducer from './authReducer';
import RankingReducer from './rankingReducer';
import { quizzesReducer, questionsReducer } from './quizReducer';
// Combinando todos os reducers
const reducers = combineReducers({
    user: AuthReducer,
    users: RankingReducer,
    quizzes: quizzesReducer,
    questions: questionsReducer,
});

export default reducers;
