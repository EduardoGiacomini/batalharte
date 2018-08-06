import { LIST_CLASSROOMS } from '../constants';

// List classrooms Redux
export function doListClassrooms(classrooms) {
    const action = {
        type: LIST_CLASSROOMS,
        payload: classrooms,
    };
    return action;
}