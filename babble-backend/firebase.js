const firebase = require('firebase'); //TODO: only require necessary modules
const keys = require('./keys');

firebase.initializeApp({
    apiKey: keys.firebase,
    authDomain: "babble-c0e8d.firebaseapp.com",
    projectId: "babble-c0e8d",
    storageBucket: "babble-c0e8d.appspot.com",
    messagingSenderId: "231957882115",
    appId: "1:231957882115:web:d252e3056243405cd2f536",
    measurementId: "G-1XG76VXZVV"
});
