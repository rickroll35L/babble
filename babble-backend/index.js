const express = require('express');

const app = express();
app.use(express.json());
const port = 8080;

const firebase = require('./firebase'); //TODO: change permission on database
const db = firebase.db;

// Simple hello world server request
app.get("/hello", (_req, res) => {
    res.json({
        key1: "yo1",
        key2: "yo2",
    })
});

// scaffolding for getting user info
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

app.post("/user", (req, res) => {
    const body = req.body;
    if (!body.username) {
        res.status(400);
        res.json({
            message: "No user specifed",
        })
    }
    else {
        resJson = users[body.username];
        res.json(resJson);
    }
});

app.listen(port);

console.log(`listening on http://localhost:${port}/`);
console.log("Press Ctrl-C to quit");

// // // // //
// TESTING  //
// // // // //
const axios = require('axios');

const res = axios.post("http://localhost:8080/user", {
    username: "user2",
})
.then(res => {
    console.log(res.data);
});

