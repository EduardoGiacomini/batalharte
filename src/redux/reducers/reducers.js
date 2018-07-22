import { combineReducers } from 'redux';
// reducers
import AuthReducer from './authReducer';
import RankingReducer from './rankingReducer';
// Combinando todos os reducers
const reducers = combineReducers({
    user: AuthReducer,
    users: RankingReducer,
});

export default reducers;
