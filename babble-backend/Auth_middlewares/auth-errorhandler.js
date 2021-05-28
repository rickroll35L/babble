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
            case 'Need to enter an email':
            case 'Need to enter a password':
            case 'No user with this email exists':
            case 'Password incorrect':
            case 'Password must be more than 6 characters':
            case 'There is already an account with this email':
                console.log(message);
                return res.status(400).send(message);
            default:
                throw res.locals.error;
        }
    }
    next();
}