import { LIST_CLASSROOMS, LIST_CLASSROOM, RESET_CLASSROOM } from '../constants';

// List classrooms Redux
export function doListClassrooms(classrooms) {
    const action = {
        type: LIST_CLASSROOMS,
        payload: classrooms,
    };
    return action;
}

// List classroom Redux
export function doListClassroom(classroom) {
    const action = {
        type: LIST_CLASSROOM,
        payload: classroom,
    };
    return action;
}

// Reset classroom state Redux
export function doResetClassroom(classroom) {
    const action = {
        type: RESET_CLASSROOM,
        payload: classroom,
    };
    return action;
}