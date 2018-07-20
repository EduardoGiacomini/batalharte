import { combineReducers } from 'redux';

// reducers
import AuthReducer from './authReducer';

// Combinando todos os reducers
const reducers = combineReducers({
    user: AuthReducer,
});

export default reducers;
