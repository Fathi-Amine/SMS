const AysncHandler = require("express-async-handler");
const Teacher = require("../../Models/Staff/Teacher");
const { genPassword, validPassword } = require("../../utils/authUtils");
const Token = require("../../Models/Global/Token");
const {attachCookieToResponse} = require("../../Utils/authUtils");
const crypto = require("crypto");


exports.adminRegisterTeacher = AysncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    //check if teacher already exists
    const teacher = await Teacher.findOne({ email });
    if (teacher) {
        throw new Error("Teacher already employed");
    }
    //Hash password
    const {hash, salt} = genPassword(password);
    // create
    const teacherCreated = await Teacher.create({
        name,
        email,
        hash,
        salt
    });
    res.status(201).json({
        status: "success",
        message: "Teacher registered successfully",
        data: teacherCreated,
    });
});

exports.teacherLogin = AysncHandler(async (req, res) => {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
        throw new Error("Teacher not found");
    }
    const tokenUser = {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: teacher.role,
    }
    if (teacher && (validPassword(password, teacher.hash, teacher.salt))) {
        let refreshToken = ""
        if (teacher.token) {
            const token = await Token.findById(teacher.token);
            refreshToken = token.refreshToken;
            attachCookieToResponse({res, user: tokenUser, refreshToken});
            return res.status(200).json({
                data: {
                    name: teacher.name,
                    email: teacher.email,
                    role: teacher.role,
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
        teacher.token = token._id;
        await teacher.save();
        const userResponse = {
            name: teacher.name,
            email: teacher.email,
            role: teacher.role,
        }
        attachCookieToResponse({res, user: tokenUser, refreshToken: token.refreshToken})
        return res.status(200).json({
            data: userResponse,
            message: 'Teacher logged in successfully'
        });
    } else {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }
});
