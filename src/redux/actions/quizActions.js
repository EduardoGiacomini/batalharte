import { LIST_QUIZZES, LIST_QUESTIONS } from '../constants/constants';

export function listQuizzes(quizzes) {
    const action = {
        type: LIST_QUIZZES,
        payload: quizzes,
    };
    return action;
}

export function listQuestions(questions) {
    const action = {
        type: LIST_QUESTIONS,
        payload: shuffle(questions),
    };
    return action;
}

// Função retirada de: https://pt.stackoverflow.com/questions/94646/como-misturar-um-array-em-javascript
export function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}