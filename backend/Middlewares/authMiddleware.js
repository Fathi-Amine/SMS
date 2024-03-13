const {verifyToken, attachCookieToResponse} = require("../Utils/authUtils");
const Admin = require('../Models/Staff/Admin');
const {Teacher} = require("../Models/Staff/Teacher");
const {Student} = require("../Models/Academic/Student");
const Token = require('../Models/Global/Token');


const authMiddleware = async (req, res, next) => {
    const {refreshToken, accessToken} = req.signedCookies

    try {
        if (accessToken.token){
            const payload = verifyToken(accessToken.token)
            req.user = payload.user
            return next()
        }
        if (!refreshToken.token){
            const error = new Error('You are not logged in');
            error.status = "Unauthenticated";
            error.statusCode = 401;
            return res.status(error.status).json({message: error.message})
        }
        const payload = verifyToken(refreshToken.token)
        let user = {}
        if (payload.user.role === 'admin'){
            user = await Admin.findById(payload.user.id);
        }else if (payload.user.role === 'teacher'){
            user = await Teacher.findById(payload.user.id);
        }else if (payload.user.role === 'student'){
            user = await Student.findById(payload.user._id);
        }
        const existingToken = await Token.findOne({
            _id: user.token,
            refreshToken: payload.refreshToken
        });
        if (!existingToken || !existingToken.isValid){
            const error = new Error('You are not logged in');
            error.status = "Unauthenticated";
            error.statusCode = 401;
            return res.status(error.status).json({message: error.message})
        }
        attachCookieToResponse({res, user: payload.user, refreshToken: existingToken.refreshToken} )
        req.user=payload.user
        next()

    } catch (error) {
        error.status = "Unauthenticated"
        error.statusCode = 401
        next(error)
    }
}
module.exports = {
    authMiddleware
};