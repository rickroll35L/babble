// // // // // // //
//* SERVER INIT  *//
// // // // // // //

// on server start, populate db.js with persistent json
const local = require('./data/db');
local.loadData();

// initialize routes
require('./routes'); 

// // // //   //
//* TESTING  *//
// // // //   //
const axios = require('axios');

axios.get("http://localhost:8080/users/user1").then(res => {
    console.log(res.data);
}, res => {
    console.log(res.response.data);
});

// axios.post("http://localhost:8080/users/create-user", {
//     id: "einar",
// })

axios.get("http://localhost:8080/users/einar").then(res => {
    console.log(res.data);
});

axios.get("http://localhost:8080/posts/0").then(res => {
    console.log(res.data);
});
