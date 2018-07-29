import { LIST_QUIZ } from '../constants/constants';

export function listQuiz(quiz) {
    const action = {
        type: LIST_QUIZ,
        payload: shuffle(quiz),
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