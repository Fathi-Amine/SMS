const errorHandlingMiddleware = (error, req, res, next) => {
    const stack = error.stack
    const message = error.message
    const status = error.status ? error.status : "Operation failed"
    const statusCode = error.statusCode ? error.statusCode : 500
    res.status(statusCode).json({
        message,
        stack,
        status
    });
}

// not found error
const notFoundError = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}
module.exports = {
    errorHandlingMiddleware,
    notFoundError
};