const Admin = require('../../Models/Staff/Admin');
const Token = require('../../Models/Global/Token');
const AsyncHandler = require('express-async-handler');
const {genPassword, attachCookieToResponse} = require("../../Utils/authUtils");
const crypto = require('crypto');
const ExamResults = require('../../Models/Academic/ExamResults');
const Teacher = require('../../Models/Staff/Teacher');

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

const logoutAdmin =AsyncHandler(async (req,res)=>{

            await Token.findOneAndDelete({user:req.user.id})
            res.cookie('accessToken','logout', {
                httpOnly: true,
                expires: new Date(Date.now())
            })
            res.cookie('refreshToken','logout', {
                httpOnly: true,
                expires: new Date(Date.now())
            })
            res.status(200).json({message:"Logged Out"})
        }
)

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
            const admin = await Admin.findById(req.user.id).select('-hash -salt -token -__v -updatedAt -createdAt').populate('academicYear');
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

const updateAdmin = AsyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const {hash, salt} = genPassword(password);
    if (email !== req.user.email) {
        const emailExists = await Admin.findOne({email});
        if (emailExists) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(req.user.id, {
        name,
        email,
        hash,
        salt
    }, {new: true});
    return res.status(200).json({
        status: 'success',
        data: updatedAdmin,
        message: 'Admin updated successfully'
    });
})


const suspendTeacher =async (req, res) => {
    const {id} = req.params;
    const teacherExists = await Teacher.findById(id);
    if (!teacherExists) {
        return res.status(404).json({
            message: 'Teacher not found'
        });
    }
    teacherExists.isSuspended = true;
    await teacherExists.save();
    res.status(200).json({
        message: 'Teacher suspended successfully'
    });
}

const unsuspendTeacher =async (req, res) => {
    const {id} = req.params;
    const teacherExists = await Teacher.findById(id);
    if (!teacherExists) {
        return res.status(404).json({
            message: 'Teacher not found'
        });
    }
    teacherExists.isSuspended = false;
    await teacherExists.save();
    res.status(200).json({
        message: 'Teacher unsuspended successfully'
    });
}

const withdrawTeacher =async (req, res) => {
    const {id} = req.params;
    const teacherExists = await Teacher.findById(id);
    if (!teacherExists) {
        return res.status(404).json({
            message: 'Teacher not found'
        });
    }
    teacherExists.isWithdrawn = true;
    await teacherExists.save();
    res.status(200).json({
        message: 'Teacher withdrawn successfully'
    });
}

const unwithdrawTeacher =async (req, res) => {
    const {id} = req.params;
    const teacherExists = await Teacher.findById(id);
    if (!teacherExists) {
        return res.status(404).json({
            message: 'Teacher not found'
        });
    }
    teacherExists.isWithdrawn = false;
    await teacherExists.save();
    res.status(200).json({
        message: 'Teacher unwithdrawn successfully'
    });
}

const publishExamResults =async (req, res) => {
    const {id} = req.params;
    const examResults = await ExamResults.findById(id);
    if (!examResults) {
        return res.status(404).json({
            message: 'Exam results not found'
        });
    }
    examResults.isPublished = true;
    await examResults.save();
    res.status(200).json({
        message: 'Exam results published successfully'
    });
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
    suspendTeacher,
    unsuspendTeacher,
    withdrawTeacher,
    unwithdrawTeacher,
    publishExamResults,
    unpublishExamResults
}