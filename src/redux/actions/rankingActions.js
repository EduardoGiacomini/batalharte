import { LIST_USERS } from '../constants/constants';

export function listUsers(users) {
    const action = {
        type: LIST_USERS,
        payload: orderUsers(users)
    };
    return action;
}

// Função responsável por ordenar os usuários
function orderUsers(users) {
    const usersOrdened = users.sort((a, b) => {
        return (a.highScore < b.highScore) ? 1 : ((b.highScore < a.highScore) ? -1 : 0);
    });
    return usersOrdened;
}