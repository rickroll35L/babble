const db = require('../database/db');
const shared = require('./shared');

module.exports = {
    changePassword,
    changeEmail,
    deleteAccount,
    getSavedPosts,
    getMyPosts,
    deletePost
}

/*************************************** */
/* Get the userid with res.locals.userid */
/*************************************** */

/* change user password, req.body: email, oldPassword, newPassword */
function changePassword(req, res) {
    // TODO
    res.send('change password');
}

/* change user email, req.body: oldEmail, newEmail, password */
function changeEmail(req, res) {
    // TODO
    res.send('change email');
}

/* delete account, req.body: email, password */
function deleteAccount(req, res) {
    // TODO
    res.send('delete account');
}

/* helper function: get all nondeleted posts as array of objects */
function getPosts(res, posts) {
    const user = db.users[res.locals.userid];
    const feed = db.posts.feed;
    const filtered = user[posts].reduce((result, id) => {
        if (!feed[id].isDeleted)
            result.push(feed[id]);
            return result;
    }, []);
    return filtered;
}

/* get saved posts */
function getSavedPosts(_req, res) {
    const saved = getPosts(res, "saved");
    res.status(200).json(saved);
}

/* get posts the user made */
function getMyPosts(_req, res) {
    const posts = getPosts(res, "posts");
    res.status(200).json(posts);
}

/* delete a post made the user, query: post id (pid) */
function deletePost(req, res) {
    shared.verifyPID(req, res, () => {
        const post = db.posts.feed[req.params.pid];
        if (post.poster === res.locals.userid) {
            post.isDeleted = true;
            db.writePosts();
            res.send(`Post ${req.params.pid} was deleted`);
        }
        else {
            res.status(403).send("User cannot delete posts they did not create.")
        }
    });
}