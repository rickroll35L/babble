module.exports = {
    errorHandler
}

async function errorHandler (req, res, next) {
    if (res.locals.error !== undefined) {
        return res.status(400).send(res.locals.error);
    }
    next();
}