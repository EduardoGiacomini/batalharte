import { database } from './firebase';

// BATALHARTE_API

// Create user
export const doCreateUser = (uid, user) =>
    database.ref(`users/${uid}`).set({ ...user });

// Get user
export const doGetUser = (id) =>
    database.ref(`users/${id}`);

// Register Classroom
export const doCreateClassroom = (classroom) =>
    database.ref('classrooms').push({ ...classroom });

// Register user in classroom
export const doRegisterUserInClassroom = (user, classroom) =>
    database.ref(`classrooms/${classroom}/students`).update({ default: false, [user]: true });

// Register classroom in user
export const doRegisterClassroomInUser = (user, classroom) =>
    database.ref(`users/${user}/classrooms`).update({ default: false, [classroom]: true });

// Verify classroom code
export const doVerifyClassroom = (classroom) =>
    database.ref(`classrooms/${classroom}`).once('value');

// Get Classroom
export const doGetClassRoom = (classroom) =>
    database.ref('classrooms').child(classroom).once('value', classroomData => classroomData);

// Register content
export const doRegisterContent = (content) =>
    database.ref('contents').push({ ...content });

// Register content in classroom
export const doRegisterContentInClassroom = (content, classroom) =>
    database.ref(`classrooms/${classroom}/contents`).update({ default: false, [content]: true });