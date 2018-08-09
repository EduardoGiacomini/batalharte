import { combineReducers } from 'redux';
// reducers
import AuthReducer from './authReducer';
import ClassroomsReducer from './classroomsReducer';
import ClassroomReducer from './classroomReducer';

const reducers = combineReducers({
    user: AuthReducer,
    classrooms: ClassroomsReducer,
    classroom: ClassroomReducer,
});

export default reducers;
