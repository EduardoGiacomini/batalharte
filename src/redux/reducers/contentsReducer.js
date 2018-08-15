import { LIST_CONTENTS } from '../constants';

// definindo estado array vazio.
const INITIAL_STATE_CONTENTS = [];

export default (state = INITIAL_STATE_CONTENTS, action) => {
    switch (action.type) {
        case LIST_CONTENTS:
            return action.payload;
        default:
            return state;
    }
}