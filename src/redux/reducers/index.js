import { combineReducers } from 'redux';
// reducers
import AuthReducer from './authReducer';
import ClassroomsReducer from './classroomsReducer';
import ClassroomReducer from './classroomReducer';
import QuestionsReducer from './questionsReducer';

const reducers = combineReducers({
    user: AuthReducer,
    classrooms: ClassroomsReducer,
    classroom: ClassroomReducer,
    questions: QuestionsReducer,
});

export default reducers;
