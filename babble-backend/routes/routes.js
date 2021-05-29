const { signup, login, isAuth, logout } = require('../authentication/auth');
const { errorHandler } = require('../authentication/auth-errorhandler');

// // // // // //
//* ROUTES    *//
// // // // // //
const initRoutes = (app, local) => {
    //* USERS___________
    //? login and user auth, req.body: email, password
    app.post("/users/login", login, errorHandler, (req, res) => {
        const loggedInUser = res.locals.loggedInUser;

        // add the appropriate user/token to auth
        local.auth[loggedInUser.hash_id] = loggedInUser.token;
        local.writeAuth();
        res.status(200).send(JSON.stringify(loggedInUser));
    });

    //? add new user, req.body: email, password
    app.post("/users/signup", signup, errorHandler, (req, res) => {
        const userData = res.locals.newUser;

        // add the appropriate user to users
        local.users[userData.id] =
        {
            password: userData.password,
            posts: [],
            saved: []
        };
        local.writeUsers();
        res.send('User was added');
    });

    //TODO: middleware

    //? Returns the user object specifed by uid.
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

    //? Testing/debugging purposes
    app.post("/users/tryauth", isAuth, errorHandler, (req, res) => {
        // console.log(res.locals.userid); // check that future middlewares have ID if needbe
        res.status(200).send('Request verified');
    });

    //? Testing/debugging purposes
    app.post("/users/logout", isAuth, logout, errorHandler, (req, res) => {
        const id_to_remove = res.locals.id_to_remove;

        // remove the appropriate entry in auth
        for (const id in local.auth) {
            if (id === id_to_remove) {
                delete local.auth[id];
            }
        }
        local.writeAuth();
        res.status(200).send('User has logged out');
    });

    //? delete user account with id uid
    app.delete("/users/:uid/delete", (req, res) => {

    });

    //TODO: edit username and password routes

    //* POSTS___________
    //? get feed (all posts)
    app.get("/posts", (_req, res) => {
        res.status(200);
        res.json(local.posts.feed.filter(post => !post.isDeleted));
    });

    app.get("/posts/:pid", (req, res) => {
        const pid = parseInt(req.params.pid, 10);
        if (!req.params.pid) {
            res.status(400);
            res.send("Error: Missing parameter 'pid'");
        }
        else if (!local.posts[pid] || local.posts[pid].isDeleted) {
            console.log(local.posts[pid]);
            res.status(404);
            res.send("Error: Post not found");
        }
        else {
            res.status(200);
            res.json(local.posts[pid]);
        }
    });

    //? create new post (req.body: post object) MARK
    app.post("/users/:uid/create-post", (req, res) => {
        const body = req.body;

    });

    //? delete post MARK
    app.delete("/posts/:pid", (req, res) => {
        const pid = parseInt(req.params.pid, 10);
        if (!req.params.pid) {
            res.status(400);
            res.send("Error: Missing parameter 'pid'");
        }
        else if (!local.posts.feed[pid] || local.posts.feed[pid].isDeleted) {
            res.status(404);
            res.send("Error: Post not found");
        }
        else {
            local.posts.feed[pid].isDeleted = true;
            local.writePosts();
            res.status(200);
            res.send(`Post ${pid} was deleted`);
        }
    });

    //TODO: get user posts (array of objects)
    //TODO: get user saved posts (array of objects)

    //? comment on post w/ id pid (req.body: comment object) MARK
    app.post("users/:uid/comment/:pid", (req, res) => {
        const body = req.body;

    });

    //? like post w/ id pid MARK
    app.post("/users/:uid/like/:pid", (req, res) => {
        const body = req.body;

    });

    //? save post w/ id pid MARK
    app.post("/users/:uid/save/:pid", (req, res) => {
        const body = req.body;

    });

    //? search for posts that match query
    app.get("/posts/search/:query", (req, res) => {

    })

    // Catch invalid endpoints
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
}

module.exports = initRoutes;