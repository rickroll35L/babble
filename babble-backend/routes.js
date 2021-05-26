const express = require('express');

const app = express();
app.use(express.json());
const port = 8080;

const local = require('./data/db');

// // // // // //
//* ROUTES    *//
// // // // // //

//* USERS___________
//? get user with id 'uid'
app.get("/users/:uid", (req, res) => {
    const uid = req.params.uid;
    if (!uid) {
        res.status(400);
        res.send("Error: Missing parameter 'uid'");
    }
    else if (!local.users[uid]) {
        res.status(404);
        res.send("Error: User not found");
    }
    else {
        res.json(local.users[uid]);
    }
});

//? add new user (TODO: auth) 
app.post("/users/create-user", (req, res) => {
    const body = req.body;
    if (!body.id) {
        res.status(400);
        res.send("Error: incorrect parameters for add-user");
    }
    else if (local.users[body.id] !== undefined) {
        res.status(409);
        res.send("Error: uid taken");
    }
    else {
        //TODO: firebase auth
        local.users[body.id] = {
            id: body.id,
            posts: [],
            saved: [],
        }
        local.writeUsers();
        res.send("User was added");
    }
});

//? delete user account with id uid
app.delete("/users/:uid/delete", (req, res) => {

});


//* POSTS___________
//? get feed (all posts)
app.get("/posts", (req, res) => {

});

//? get post with id 'pid'
app.get("/posts/:pid", (req, res) => {
    const pid = parseInt(req.params.pid, 10);
    if (!req.params.pid) {
        res.status(400);
        res.send("Error: Missing parameter 'pid'");
    }
    else if (!local.posts[pid]) {
        console.log(local.posts[pid]);
        res.status(404);
        res.send("Error: Post not found");
    }
    else {
        res.json(local.posts[pid]);
    }
});

//? create new post (req.body: post object)
app.post("/users/:uid/create-post", (req, res) => {
    const body = req.body;

});

//? delete post
app.delete("/posts/:pid/delete", (req, res) => {

});

//? comment on post w/ id pid (req.body: comment object)
app.post("users/:uid/comment/:pid", (req, res) => {
    const body = req.body;

});

//? like post w/ id pid
app.post("/users/:uid/like/:pid", (req, res) => {
    const body = req.body;

});

//? save post w/ id pid
app.post("/users/:uid/save/:pid", (req, res) => {
    const body = req.body;

});

//? search for posts that match query
app.get("/posts/search/:query", (req, rest) => {

})


// // // //  //
//* DEPLOY  *//
// // // //  //

app.listen(port);
console.log(`listening on http://localhost:${port}/`);
console.log("Press Ctrl-C to quit");