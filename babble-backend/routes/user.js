const express = require('express');
const user_router = express.Router();
const { isAuth, logout } = require('../authentication/auth');
const { auth_errorHandler } = require('../authentication/auth-errorhandler');
const {
    changePassword,
    changeEmail,
    deleteAccount,
    getSavedPosts,
    getMyPosts,
    deletePost
} = require('../controllers/user-controller');

module.exports = user_router;

/* All requests related to the user will require autentication 
   token in the header */
user_router.use(isAuth, auth_errorHandler);

/************************************** routes **************************************/

/* change user password, req.body: email, oldPassword, newPassword */
user_router.post('/change-password', changePassword);

/* change user email, req.body: oldEmail, newEmail, password */
user_router.post('/change-email', changeEmail);

/* delete account, req.body: email, password */
user_router.delete('/delete-account', deleteAccount);

/* get saved posts */
user_router.get('/saved-posts', getSavedPosts);

/* get posts the user made */
user_router.get('/my-posts', getMyPosts);

/* delete a post made the user, query: post id (pid) */
user_router.delete('/delete-post/:pid', deletePost);

/* log out */
user_router.post('/logout', logout, (req, res) => {});