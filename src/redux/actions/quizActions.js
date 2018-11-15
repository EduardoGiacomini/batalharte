import { LIST_QUESTIONS } from '../constants';

// List questions Redux
export function doListQuestions(questions) {
    const action = {
        type: LIST_QUESTIONS,
        payload: questions,
    };
    return action;
}