/************************************* SERVER INIT ************************************* */
const express = require('express');
const app = express();
app.use(express.json());

// on server start, populate db.js with persistent json
const db = require('./database/db');
db.loadData();

/************************************* ROUTES ************************************* */
const enter_router = require('./routes/enter');
const user_router = require('./routes/user');
const posts_router = require('./routes/posts');

app.use('/enter', enter_router);
app.use('/user', user_router);
app.use('/posts', posts_router);

/* Catch invalid endpoints */
app.get('*', (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl + ' is an invalid address');
    res.status(404).send('Your endpoint was not found');
})

app.post('*', (_req, res) => {
    res.status(404).send('Your endpoint was not found');
})

app.delete('*', (_req, res) => {
    res.status(404).send('Your endpoint was not found');
})

/************************************* DEPLOY ************************************* */
const port = 8080;

app.listen(port);
console.log(`listening on http://localhost:${port}/`);
console.log("Press Ctrl-C to quit");

/************************************* TESTING ************************************* */
const axios = require('axios');

// axios.post(`http://localhost:${port}/enter/signup`, {
//     email: "user@g.ucla.edu",
//     password: "123456789",
// });

axios.post(`http://localhost:${port}/enter/login`, {
    email: "user@g.ucla.edu",
    password: "123456789",
}).then(res => {
    const token = JSON.stringify(res.data);
    const header = {
        headers: {
            Authentication: token,
        }
    };

    //put HTTP requests here (pass in header for auth)
})

