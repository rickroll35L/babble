const db = require('../database/db');

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
async function changePassword (req, res) {
    // TODO
    res.send('change password');
}

/* change user email, req.body: oldEmail, newEmail, password */
async function changeEmail (req, res) {
    // TODO
    res.send('change email');
}

/* delete account, req.body: email, password */
async function deleteAccount (req, res) {
    // TODO
    res.send('delete account');
}

/* get saved posts */
async function getSavedPosts (req, res) {
    // TODO
    res.send('got saved posts');
}

/* get posts the user made */
async function getMyPosts (req, res) {
    // TODO
    res.send('got my posts');
}

/* delete a post made the user, query: post id (pid) */
/* suggestion: if the post exists and has already been deleted, 
                maybe there should be no error
   suggestion: maybe you should only be allowed to delete if this
               post was made by this specific user */
async function deletePost (req, res) {
    const pid = parseInt(req.params.pid, 10);
    if (!req.params.pid) {
        res.status(400);
        res.send("Error: Missing parameter 'pid'");
    }
    else if (!db.posts.feed[pid] || db.posts.feed[pid].isDeleted) {
        res.status(404);
        res.send("Error: Post not found");
    }
    else {
        db.posts.feed[pid].isDeleted = true;
        db.writePosts();
        res.status(200);
        res.send(`Post ${pid} was deleted`);
    }
}