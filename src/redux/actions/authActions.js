import { USER_SIGNED_IN, USER_SIGNED_OUT } from '../constants';

// Sign In Redux
export function doSignIn(user) {
    const action = {
        type: USER_SIGNED_IN,
        payload: user,
    };
    return action;
}

// Sign Out Redux
export function doSignOut(user) {
    const action = {
        type: USER_SIGNED_OUT,
        payload: user,
    };
    return action;
}
