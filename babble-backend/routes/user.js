const express = require('express');
const user_router = express.Router();
const { isAuth } = require('../authentication/auth');
const { auth_errorHandler } = require('../authentication/auth-errorhandler');
const {
    changePassword,
    changeEmail,
    deleteAccount
} = require('../controllers/user-controller');

module.exports = user_router;

/* All requests related to the user will requrie autentication */
user_router.use(isAuth, auth_errorHandler);

/************************************** routes **************************************/

/* change user password, req.body: email, oldPassword, newPassword */
user_router.post('/change-password', changePassword);

/* change user email, req.body: oldEmail, newEmail, password */
user_router.post('/change-email', changeEmail);

/* delete account, req.body: email, password */
user_router.delete('/delete-account', deleteAccount);

