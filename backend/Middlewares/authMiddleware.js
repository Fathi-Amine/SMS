
const isLoggedIn = (req, res, next) => {
    const isLogged = req.isAuthenticated;
    if (isLogged) {
        return next();
    }else {
        const error = new Error('You are not logged in');
        error.status = "Unauthenticated";
        error.statusCode = 401;
        next(error);
    }
}

module.exports = {
    isLoggedIn
};