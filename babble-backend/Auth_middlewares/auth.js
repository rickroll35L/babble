const argon2 = require('argon2');
//import * as argon2 from 'argon2';

module.exports = {
    signup
}

async function signup (req, res, next) {
    //const body = JSON.parse(req.body);
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Check that email and password are valid
        if (email === undefined) throw new Error('Need to enter an email');
        if (password === undefined) throw new Error('Need to enter a password');
            // TODO: verfiy that email is a valid ucla email
            // and that this email is not already in use
        if (password.length < 6) throw new Error('Password must be more thatn 6 characters');

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
        // TODO: pass on errors to error handler
        res.locals.error = err; 
        next();
    }
}