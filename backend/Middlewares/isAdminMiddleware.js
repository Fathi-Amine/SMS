const isAdminMiddleware = (req, res, next) => {
    const {user} = req;
    if (user.role === 'admin'){
        return next();
    }else {
        const error = new Error('You are not authorized to perform this action');
        error.status = "Unauthorized";
        error.statusCode = 403;
        next(error);
    }
}

module.exports = isAdminMiddleware;