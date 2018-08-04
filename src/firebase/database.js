import { database } from './firebase';

// User API

// Registrar usuário
export const doCreateUser = (id, user) =>
    database.ref(`users/${id}`).set({ ...user });

// Buscar usuário (once = realizar a busca uma única vez, sem escutar as alterações)
export const doOnceGetUser = (id) =>
    database.ref(`users/${id}`).once('value');

    export const onceGetUsers = () =>
    database.ref('users').once('value');
