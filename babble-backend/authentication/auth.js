const db = require('../database/db');
const { createAccessToken } = require('./tokens');
const {
    encryptEmail,
    encryptPassword,
    userWithEmail,
    passwordMatchesUser,
    isUCLAemail
} = require('./manage-user-info');

module.exports = {
    signup,
    login,
    isAuth,
    logout
}

/* Logs the user out. Assumes that the request has 
   already been authenticated */
async function logout (req, res, next) {
    try {
        // get authentication from request header (assumes it's correct)
        const headers = req.headers;
        const auth = JSON.parse(headers.authentication);

        // id to remove the authentication from auth
        const id_to_remove = auth.hash_id;

        // remove the appropriate entry in auth
        for (const id in db.auth) {
            if (id === id_to_remove) {
                delete db.auth[id];
            }
        }
        db.writeAuth();
        res.status(200).send('User has logged out');
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
        const auth_in_database = db.auth[auth_id];
        if (auth_in_database === undefined) throw new Error('Invalid credentials');
        if (auth_in_database !== auth_token) throw new Error('Invalid credentials');

        // Pass userid to future middleware functions
        res.locals.userid = auth_id;
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
    // get login data from request body
    const email = req.body.email;
    const password = req.body.password;

    try{
        // Check that email and password are present
        if (email === undefined || email === "") throw new Error('Need to enter an email');
        if (password === undefined || password === "") throw new Error('Need to enter a password');

        // Check that there is a user with this email
        const user = await userWithEmail(email);
        if (user === undefined) throw new Error('No user with this email exists');

        // if user exists, check that passwords match
        const passwordMatches = await passwordMatchesUser(user, password);
        if (!passwordMatches) throw new Error('Password incorrect');

        // generate token
        const auth_token = 
            { 
                hash_id: await encryptEmail(email),
                token: await createAccessToken()
            };
        
        /* log the user in by sending back the authentication token
           and add the appropriate user/token to auth */
        db.auth[auth_token.hash_id] = auth_token.token;
        db.writeAuth();
        console.log('User has logged in');
        res.status(200).send(JSON.stringify(auth_token));
    }
    catch (err) {
        res.locals.error = err; 
        next();
    }
}

/* Sign a new user in. Requires the email and password to be sent
   in a json object in the body of the request */
async function signup (req, res, next) {
    // get signup data from request body
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Check that email and password are valid
        if (email === undefined || email === "") throw new Error('Need to enter an email');
        if (password === undefined || password === "") throw new Error('Need to enter a password');
        if (password.length < 6) throw new Error('Password must be more than 6 characters');

        // Verfiy that email fits format of a ucla email address
        if (isUCLAemail(email) == false) throw new Error('Not a valid UCLA email address');
        
        // Check if there is already an account with this email
        const user = await userWithEmail(email);
        if (user !== undefined) throw new Error('There is already an account with this email');
        
        // Add the user to the database
        const hashed_id = await encryptEmail(email);
        const hashed_password = await encryptPassword(password);
        const userData = 
            {
                id: hashed_id,
                password: hashed_password
            }

        // add the appropriate user to users
        db.users[userData.id] =
        {
            password: userData.password,
            posts: [],
            saved: []
        };
        db.writeUsers();
        res.status(200).send('User was added');
    }
    catch (err) {
        res.locals.error = err; 
        next();
    }
}
