module.exports = {
    errorHandler
}

/* This handles the status' of the responses and sends back the 
   appropriate message */
async function errorHandler (req, res, next) {
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

            // errors with unauthorized access/login/signup
            case 'No user with this email exists':
            case 'There is already an account with this email':
            case 'Password incorrect':
            case 'Password must be more than 6 characters':
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