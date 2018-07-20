import { USER_LOGGED, USER_LOGOUT } from '../constants/constants';

export function signIn(user) {
    const action = {
        type: USER_LOGGED,
        payload: user,
    };
    return action;
}

export function signOut(user) {
    const action = {
        type: USER_LOGOUT,
        payload: user,
    };
    return action;
}
