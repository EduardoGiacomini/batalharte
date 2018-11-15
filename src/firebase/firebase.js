import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
    apiKey: "AIzaSyBRybVuvAapp3rH50vpR_gB9lMN93OtRqA",
    authDomain: "batalharte.firebaseapp.com",
    databaseURL: "https://batalharte.firebaseio.com",
    projectId: "batalharte",
    storageBucket: "batalharte.appspot.com",
    messagingSenderId: "234140737976"
};

const devConfig = {
    apiKey: "AIzaSyBRybVuvAapp3rH50vpR_gB9lMN93OtRqA",
    authDomain: "batalharte.firebaseapp.com",
    databaseURL: "https://batalharte.firebaseio.com",
    projectId: "batalharte",
    storageBucket: "batalharte.appspot.com",
    messagingSenderId: "234140737976"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const database = firebase.database();
const auth = firebase.auth();

export {
    auth,
    database,
};