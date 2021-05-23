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

const db = firebase.database();

// temporary scaffolding
users = {
    user1: {
        name: "user1",
        points: 100,
    },
    user2: {
        name: "user2",
        points: 60,
    },
    user3: {
        name: "user3",
        points: 30,
    },
};

// helpful: https://dev.to/irohitgaur/how-to-use-firebase-realtime-database-in-a-node-js-app-nn

db.ref("users").set(users, error => {
    if (error)
        console.log("write failed");
})

module.exports = {
    db,
}
