import { combineReducers } from 'redux';
// reducers
import AuthReducer from './authReducer';

const reducers = combineReducers({
    user: AuthReducer,
});

export default reducers;
