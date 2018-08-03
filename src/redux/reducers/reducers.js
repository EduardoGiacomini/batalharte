import { combineReducers } from 'redux';
// reducers
import AuthReducer from './authReducer';
import ClassroomsReducer from './classroomsReducer';
import { quizzesReducer, questionsReducer } from './quizReducer';
// Combinando todos os reducers
const reducers = combineReducers({
    user: AuthReducer,
    classrooms: ClassroomsReducer,
    quizzes: quizzesReducer,
    questions: questionsReducer,
});

export default reducers;
