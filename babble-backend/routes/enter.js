const express = require('express');
const enter_router = express.Router();
const { signup, login } = require('../authentication/auth');
const { auth_errorHandler } = require('../authentication/auth-errorhandler');

module.exports = enter_router;

/************************************** routes **************************************/

/* login and user auth, req.body: email, password */
enter_router.post('/login', login, auth_errorHandler, (req, res) => {});

/* add new user, req.body: email, password */
enter_router.post('/signup', signup, auth_errorHandler, (req, res) => {});