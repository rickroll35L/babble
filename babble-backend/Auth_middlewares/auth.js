const argon2 = require('argon2');
const local = require('../data/db');
//import * as argon2 from 'argon2';

module.exports = {
    signup
}

async function signup (req, res, next) {
    //const body = JSON.parse(req.body);
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
        const hashed_id = await argon2.hash(email, 32);
        const doesIdExist = local.users[hashed_id];
        if (doesIdExist !== undefined) throw new Error('There is already an account with this email');
        
        // Add the user to the database
        const hashed_password = await argon2.hash(password, 32);
        res.locals.newUser = 
            {
                id: hashed_id,
                password: hashed_password
            }
        next();
    }
    catch (err) {
        // TODO: pass on errors to error handler
        console.log(err.message);
        res.locals.error = err.message; 
        next();
    }
}