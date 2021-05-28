const argon2 = require('argon2');
const local = require('../database/db');
const { createAccessToken } = require('./tokens');

module.exports = {
    signup,
    login
}

/* Logs an existing user in. Requires the log in email and password
   to be send in a json object in the body of the request */
async function login (req, res, next) {
    local.loadData();
    const email = req.body.email;
    const password = req.body.password;

    try{
        // Check that email and password are present
        if (email === undefined || email === "") throw new Error('Need to enter an email');
        if (password === undefined || password === "") throw new Error('Need to enter a password');

        // Check that there is a user with this email
        let user = undefined;
        let userid = undefined;
        for (const id in local.users) {
            const emailExists = await argon2.verify(id, email);
            if (emailExists) {
                user = local.users[id];
                userid = id;
            }
        }
        if (user === undefined) throw new Error('No user with this email exists');

        // if user exists, check that passwords match
        const passwordMatches = await argon2.verify(user.password, password);
        if (!passwordMatches) throw new Error('Password incorrect');

        // generate token
        const auth_token = 
            { 
                hash_id: userid,
                token: await createAccessToken()
            };

        // add id and token to auth.json
        local.auth[auth_token.hash_id] = local.auth.token;
        local.writeAuth();
        
        // log the user in by sending back the authentication token
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
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Check that email and password are valid
        if (email === undefined || email === "") throw new Error('Need to enter an email');
        if (password === undefined || password === "") throw new Error('Need to enter a password');
        if (password.length < 6) throw new Error('Password must be more than 6 characters');

        // TODO: verfiy that email is a valid ucla email
        
        // Check if there is already an account with this email
        let user = undefined;
        for (const id in local.users) {
            const emailExists = await argon2.verify(id, email);
            if (emailExists) {
                user = local.users[id];
            }
        }
        if (user !== undefined) throw new Error('There is already an account with this email');
        
        // Add the user to the database
        const hashed_id = await argon2.hash(email, 32);
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