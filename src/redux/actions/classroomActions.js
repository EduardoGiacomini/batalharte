import { LIST_CLASSROOMS } from '../constants/constants';

export function listClassrooms(classrooms) {
    const action = {
        type: LIST_CLASSROOMS,
        payload: classrooms,
    };
    return action;
}