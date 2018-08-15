import { combineReducers } from 'redux';
// reducers
import AuthReducer from './authReducer';
import ClassroomsReducer from './classroomsReducer';
import ClassroomReducer from './classroomReducer';
import ContentsReducer from './contentsReducer';

const reducers = combineReducers({
    user: AuthReducer,
    classrooms: ClassroomsReducer,
    classroom: ClassroomReducer,
    contents: ContentsReducer,
});

export default reducers;
