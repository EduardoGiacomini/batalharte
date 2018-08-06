import { database } from './firebase';

// API

// Registrar usuário
export const doCreateUser = (id, user) =>
    database.ref(`users/${id}`).set({ ...user });

// Buscar usuário (É necessário deixar a lógica em outra parte pois
// trata-se de atualizações em tempo real)
export const doGetUser = (id) =>
    database.ref(`users/${id}`);

// Registrar turma
export const doCreateClassroom = (classroom) =>
    database.ref('classrooms').push({ ...classroom });

// Verificar se a turma é válida
export const doVerifyClassroom = (classroom) =>
    database.ref(`classrooms/${classroom}`).once('value');

// Registrar usuário na turma
export const doRegisterUserInClassroom = (user, classroom) =>
    database.ref(`classrooms/${classroom}/students`).update({ default: false, [user]: true });

// Registrar turma nas informações do usuário
export const doRegisterClassroomInUser = (user, classroom) =>
    database.ref(`users/${user}/classrooms`).update({ default: false, [classroom]: true });

export const doGetClassRooms = () =>
    database.ref('classrooms').once('value');