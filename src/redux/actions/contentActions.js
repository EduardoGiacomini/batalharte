import { LIST_CONTENTS } from '../constants';

// List contents Redux
export function doListContents(contents) {
    const action = {
        type: LIST_CONTENTS,
        payload: contents,
    };
    return action;
}