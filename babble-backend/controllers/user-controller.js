const db = require('../database/db');
const shared = require('./shared');
const {
    encryptEmail,
    encryptPassword,
    userWithEmail,
    passwordMatchesUser,
    isUCLAemail
} = require('../authentication/manage-user-info');

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

/* change user password, req.body: email, currentPassword, newPassword */
async function changePassword(req, res) {
    /* check for needed values */
    const email = req.body.email;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    if (!email || !currentPassword || !newPassword) 
        return res.status(401).send('Need to enter email, old password, and new password');

    /* check that values are valid */
    const user_id = await encryptEmail(email);
    const user = await userWithEmail(email);
    if (user === undefined || user_id != res.locals.userid) 
        return res.status(401).send('Incorrect email');

    // if user exists, check that passwords match
    const passwordMatches = await passwordMatchesUser(user, currentPassword);
    if (!passwordMatches) 
        return res.status(401).send('Incorrect current password');

    // new password should be valid
    if (newPassword.length < 6) 
        return res.status(401).send('New password must be at least 6 characters');

    // if everything is valid, change the password and delete current auth token
    db.users[user_id].password = await encryptPassword(newPassword);
    db.writeUsers();
    delete db.auth[user_id];
    db.writeAuth();

    res.status(200).send('Password changed. Login again to proceed');
}

/* change user email, req.body: currentEmail, newEmail, password */
async function changeEmail(req, res) {
    /* check for needed values */
    const currentEmail = req.body.currentEmail;
    const newEmail = req.body.newEmail;
    const password = req.body.password;

    if (!currentEmail || !newEmail|| !password) 
        return res.status(401).send('Need to enter current email, new email, and password');

    /* check that values are valid */
    const user_id = await encryptEmail(currentEmail);
    const user = await userWithEmail(currentEmail);
    if (user === undefined || user_id != res.locals.userid) 
        return res.status(401).send('Incorrect curent email');

    // if user exists, check that passwords match
    const passwordMatches = await passwordMatchesUser(user, password);
    if (!passwordMatches) 
        return res.status(401).send('Incorrect password');

    // new email should be UCLA email
    if (!isUCLAemail(newEmail))
        return res.status(401).send('New email must be a valid UCLA email');

    // if everything is valid, change the email, delete old user email, and auth token
    db.users[await encryptEmail(newEmail)] =
    {
        password: user.password,
        posts: user.posts,
        saved: user.saved
    };
    delete db.users[user_id];
    db.writeUsers();
    delete db.auth[user_id];
    db.writeAuth();

    res.status(200).send('Email updated. Login again to proceed');
}

/* delete account, req.body: email, password */
async function deleteAccount(req, res) {
    /* check for needed values */
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password)
        return res.status(401).send('Need to enter email, and password');

    /* check that values are valid */
    const user_id = await encryptEmail(email);
    const user = await userWithEmail(email);
    if (user === undefined || user_id != res.locals.userid) 
        return res.status(401).send('Incorrect email');

    // if user exists, check that passwords match
    const passwordMatches = await passwordMatchesUser(user, password);
    if (!passwordMatches) 
        return res.status(401).send('Incorrect password');

    // if everything is valid, remove the user and auth token
    delete db.users[user_id];
    db.writeUsers();
    delete db.auth[user_id];
    db.writeAuth();

    res.status(200).send('Account deleted.');
}

/* helper function: get all nondeleted posts of type 'saved'
   or 'my posts', or another type from the user as array of objects */
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

/* delete a post made the user, req.params: post id (pid) */
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
