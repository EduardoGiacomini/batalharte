import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBRybVuvAapp3rH50vpR_gB9lMN93OtRqA",
    authDomain: "batalharte.firebaseapp.com",
    databaseURL: "https://batalharte.firebaseio.com",
    projectId: "batalharte",
    storageBucket: "batalharte.appspot.com",
    messagingSenderId: "234140737976"
};

firebase.initializeApp(config);

export default firebase;