import { combineReducers } from 'redux';
// reducers
import AuthReducer from './authReducer';
import RankingReducer from './rankingReducer';
import QuizReducer from './quizReducer';
// Combinando todos os reducers
const reducers = combineReducers({
    user: AuthReducer,
    users: RankingReducer,
    quiz: QuizReducer,
});

export default reducers;
