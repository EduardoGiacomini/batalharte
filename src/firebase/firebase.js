import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
    // Your configuration - Firebase Key
};

const devConfig = {
    // Your configuration - Firebase Key
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