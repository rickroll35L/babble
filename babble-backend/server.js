// // // // // // //
//* SERVER INIT  *//
// // // // // // //
const express = require('express');
const app = express();
app.use(express.json());

// on server start, populate db.js with persistent json
const local = require('./database/db');
local.loadData();

// initialize routes
const initRoutes = require('./routes/routes');
initRoutes(app, local);

// // // //  //
//* DEPLOY  *//
// // // //  //
const port = 8080;

app.listen(port);
console.log(`listening on http://localhost:${port}/`);
console.log("Press Ctrl-C to quit");

// // // //   //
//* TESTING  *//
// // // //   //
const axios = require('axios');

// axios.get("http://localhost:8080/users/user1").then(res => {
//     console.log(res.data);
// }, res => {
//     console.log(res.response.data);
// });

// axios.post("http://localhost:8080/users/signup", {
//     id: "user1111",
// })

// axios.get("http://localhost:8080/users/user1111").then(res => {
//     console.log(res.data);
// });

// axios.get("http://localhost:8080/posts/0").then(res => {
//     console.log(res.data);
// });
