module.exports = {
    auth_errorHandler
}

/* This handles the status' of the responses and sends back the 
   appropriate message */
async function auth_errorHandler (req, res, next) {
    if (res.locals.error !== undefined) {
        message = res.locals.error.message;

        // Print our error messages, but any other (code) errors, should print the whole error
        switch (message) {
            // errors with bad request
            case 'Need to enter an email':
            case 'Need to enter a password':
            case 'Missing authentication token':
            case 'Incomplete authentication token':
                console.log(message);
                return res.status(400).send(message);

            // errors with unauthorized access/signup/login
            case 'There is already an account with this email':
            case 'Not a valid UCLA email address':
            case 'Password must be more than 6 characters':
            case 'No user with this email exists':
            case 'Password incorrect':
                console.log(message);
                return res.status(401).send(message);

            // errors trying to access forbidden pages
            case 'Invalid credentials':
                console.log(message);
                return res.status(403).send(message);

            // For errors in server code (not request errors)
            default:
                throw res.locals.error;
        }
    }
    next();
}