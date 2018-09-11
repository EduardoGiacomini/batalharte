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

// Get Content
export const doGetContent = (content) =>
    database.ref('contents').child(content).once('value', contentsData => contentsData);

// Get Contents
export const doGetContentsPublic = () =>
    database.ref('contents').orderByChild('isPublic').equalTo(true).once('value', contentsData => contentsData);

// Register question
export const doRegisterQuestion = (question) =>
    database.ref('questions').push({ ...question });

// Get questions (Full)
export const doGetQuestions = () =>
    database.ref('questions').once('value');

// Get questions (Filter on)
export const doGetQuestionsWithFilter = (filter) =>
    database.ref('questions').orderByChild('discipline').equalTo(filter).once('value');

// Get Question
export const doGetQuestion = (question) =>
    database.ref('questions').child(question).once('value', question => question);

// Register quiz
export const doRegisterQuiz = (classroom, quiz) =>
    database.ref(`classrooms/${classroom}/quizzes`).push({ ...quiz });

// Alter default state of quiz
export const doAlterDefaultState = (classroom) =>
    database.ref(`classrooms/${classroom}/quizzes`).update({ default: false });

// Get quiz
export const doGetQuiz = (classroom, quiz) =>
    database.ref(`classrooms/${classroom}/quizzes/${quiz}`).once('value');

// Response quiz
export const doResponseQuiz = (classroom, quiz, review) =>
    database.ref(`classrooms/${classroom}/quizzes/${quiz}/score`).update({ default: false, [review.user]: { ...review } });