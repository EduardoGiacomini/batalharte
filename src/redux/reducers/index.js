import { combineReducers } from 'redux';
// reducers
import AuthReducer from './authReducer';
import ClassroomReducer from './classroomReducer';

const reducers = combineReducers({
    user: AuthReducer,
    classrooms: ClassroomReducer,
});

export default reducers;
