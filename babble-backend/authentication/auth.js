const argon2 = require('argon2');
const crypto = require('crypto')
const local = require('../database/db');
const { createAccessToken } = require('./tokens');

module.exports = {
    signup,
    login,
    isAuth,
    logout
}

/* Logs the user out. Assumes that the request has 
   already been authenticated */
async function logout (req, res, next) {
    local.loadData();

    try {
        // get authentication from request header (assumes it's correct)
        const headers = req.headers;
        const auth = JSON.parse(headers.authentication);

        // pass back id to remove the authentication from auth
        const id_to_remove = auth.hash_id
        res.locals.id_to_remove = id_to_remove;
        next();
    }
    catch (err) {
        res.locals.error = err; 
        next();
    }
}

/* Authenticates a user whenever the get/post deals 
   with sensitive data (posts, user data, etc...). 
   Passing in the token (obtained at login) in the request
   header will authenticate the action */
async function isAuth (req, res, next) {
    local.loadData();
    
    // get authentication from request header
    const headers = req.headers;
    const auth = JSON.parse(headers.authentication);
    
    // Check if the authentication is correct
    try {
        // check that authentication is present
        if (auth === undefined) throw new Error('Missing authentication token');
        const auth_id = auth.hash_id;
        const auth_token = auth.token;
        if (auth_id === undefined || auth_id === "") throw new Error('Incomplete authentication token');
        if (auth_token === undefined || auth_token === "") throw new Error('Incomplete authentication token');

        // Check that the authentication is valid
        const auth_in_database = local.auth[auth_id];
        if (auth_in_database === undefined) throw new Error('Invalid credentials');
        if (auth_in_database !== auth_token) throw new Error('Invalid credentials');
        next();
    }
    catch (err) {
        res.locals.error = err; 
        next();
    }
}

/* Logs an existing user in. Requires the log in email and password
   to be send in a json object in the body of the request */
async function login (req, res, next) {
    local.loadData();

    // get login data from request body
    const email = req.body.email;
    const password = req.body.password;

    try{
        // Check that email and password are present
        if (email === undefined || email === "") throw new Error('Need to enter an email');
        if (password === undefined || password === "") throw new Error('Need to enter a password');

        // Check that there is a user with this email
        const hash_email = await crypto.createHash('sha256').update(email).digest('base64');;
        const user = local.users[hash_email];
        if (user === undefined) throw new Error('No user with this email exists');

        // if user exists, check that passwords match
        const passwordMatches = await argon2.verify(user.password, password);
        if (!passwordMatches) throw new Error('Password incorrect');

        // generate token
        const auth_token = 
            { 
                hash_id: hash_email,
                token: await createAccessToken()
            };

        // add id and token to auth.json
        //local.auth[auth_token.hash_id] = local.auth.token;
        //local.writeAuth();
        //console.log('hithere');
        
        // log the user in by sending back the authentication token
        // This will also add id and token to auth.json
        res.locals.loggedInUser = auth_token;
        next();
    }
    catch (err) {
        res.locals.error = err; 
        next();
    }
}

/* Sign a new user in. Requires the email and password to be sent
   in a json object in the body of the request */
async function signup (req, res, next) {
    local.loadData();

    // get signup data from request body
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Check that email and password are valid
        if (email === undefined || email === "") throw new Error('Need to enter an email');
        if (password === undefined || password === "") throw new Error('Need to enter a password');
        if (password.length < 6) throw new Error('Password must be more than 6 characters');

        // Verfiy that email fits format of a ucla email address
        const ucla_email_1 = /^[a-z]+@ucla\.edu$/;
        const ucla_email_2 = /^[a-z]+@g\.ucla\.edu$/;
        if (!ucla_email_1.test(email) && !(ucla_email_2.test(email))) throw new Error('Not a valid UCLA email address');
        
        // Check if there is already an account with this email
        const hash_email = await crypto.createHash('sha256').update(email).digest('base64');
        const user = local.users[hash_email];
        if (user !== undefined) throw new Error('There is already an account with this email');
        
        // Add the user to the database
        const hashed_id = await crypto.createHash('sha256').update(email).digest('base64');
        const hashed_password = await argon2.hash(password, 32);
        res.locals.newUser = 
            {
                id: hashed_id,
                password: hashed_password
            }
        next();
    }
    catch (err) {
        res.locals.error = err; 
        next();
    }
}