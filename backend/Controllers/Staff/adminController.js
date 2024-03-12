const Admin = require('../../Models/Staff/Admin');
const Token = require('../../Models/Global/Token');
const AsyncHandler = require('express-async-handler');
const {genPassword, issueJWT, attachCookieToResponse} = require("../../Utils/authUtils");
const crypto = require('crypto');

const registerAdmin = AsyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const adminFound = await Admin.findOne({email});
    if (adminFound) {
        const error = new Error('Admin already exists');
        error.statusCode = 409;
        throw error;
    }
    // generate hash and salt
    const {hash, salt} = genPassword(password);
    console.log(hash, salt)
    const user = await Admin.create({
        name,
        email,
        hash,
        salt
    });
    res.status(201).json({data: user, message: 'Admin created successfully'});
})

const loginAdmin = AsyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const admin = await Admin.findOne({email});
    if (!admin) {
        return res.status(404).json({
            message: 'Admin not found'
        });
    }

    const tokenUser = {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
    }

    if(admin && (await admin.comparePassword(password))) {
        let refreshToken = ""
        if (admin.token) {
            const token = await Token.findById(admin.token);
            refreshToken = token.refreshToken;
            attachCookieToResponse({res, user: tokenUser, refreshToken});
            return res.status(200).json({
                data: {
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                },
                message: 'Admin logged in successfully'
            });
        }
        const token = await Token.create({
            refreshToken: crypto.randomBytes(40).toString('hex'),
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            isValid: true
        });
        admin.token = token._id;
        await admin.save();
        const userResponse = {
            name: admin.name,
            email: admin.email,
            role: admin.role,
        }
        attachCookieToResponse({res, user: tokenUser, refreshToken: token.refreshToken})
        return res.status(200).json({
            data: userResponse,
            message: 'Admin logged in successfully'
        });
    }else {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }
})

const logoutAdmin =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin logged out successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const getAllAdmins = AsyncHandler(async (req, res) => {
    const admins = await Admin.find().select('-hash -salt -token -__v -updatedAt -createdAt');
    if (!admins) {
        throw new Error('No admin found');
    }
    res.status(200).json({
        status: 'success',
        data: admins,
        message: 'Admins retrieved successfully'
    });
})

const getAdminProfile =AsyncHandler(async (req, res) => {
            const admin = await Admin.findById(req.user.id).select('-hash -salt -token -__v -updatedAt -createdAt');
            if (!admin) {
                throw new Error('Admin not found');
            }else {
                res.status(200).json({
                    status: 'success',
                    data: admin,
                    message: 'Admin retrieved successfully'
                });
            }
    }
)

const updateAdmin =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin updated successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const deleteAdmin =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin deleted successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const suspendTeacher =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher suspended successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const unsuspendTeacher =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher activated successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const withdrawTeacher =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher withdrawn successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const unwithdrawTeacher =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher unwithdrawn successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const publishExamResults =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Exam results published successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const unpublishExamResults =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Exam results unpublished successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
module.exports = {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAllAdmins,
    getAdminProfile,
    updateAdmin,
    deleteAdmin,
    suspendTeacher,
    unsuspendTeacher,
    withdrawTeacher,
    unwithdrawTeacher,
    publishExamResults,
    unpublishExamResults
}