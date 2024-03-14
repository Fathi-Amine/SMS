const AsyncHandler = require("express-async-handler");
const {genPassword, validPassword, attachCookieToResponse} = require("../../Utils/authUtils");
const Student = require("../../Models/Academic/Student");
const Token = require("../../Models/Global/Token");
const crypto = require("crypto");


exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    //check if teacher already exists
    const student = await Student.findOne({ email });
    if (student) {
        throw new Error("Student already registered");
    }
    //Hash password
    const {hash, salt} = genPassword(password);
    // create
    const studentCreated = await Student.create({
        name,
        email,
        hash,
        salt
    });
    res.status(201).json({
        status: "success",
        message: "Student registered successfully",
        data: studentCreated,
    });
});

exports.studentLogin = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
        throw new Error("Teacher not found");
    }
    const tokenUser = {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
    }
    if (student && (validPassword(password, student.hash, student.salt))) {
        let refreshToken = ""
        if (student.token) {
            const token = await Token.findById(student.token);
            refreshToken = token.refreshToken;
            attachCookieToResponse({res, user: tokenUser, refreshToken});
            return res.status(200).json({
                data: {
                    name: student.name,
                    email: student.email,
                    role: student.role,
                },
                message: 'Student logged in successfully'
            });
        }
        const token = await Token.create({
            refreshToken: crypto.randomBytes(40).toString('hex'),
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            isValid: true
        });
        student.token = token._id;
        await student.save();
        const userResponse = {
            name: student.name,
            email: student.email,
            role: student.role,
        }
        attachCookieToResponse({res, user: tokenUser, refreshToken: token.refreshToken})
        return res.status(200).json({
            data: userResponse,
            message: 'Student logged in successfully'
        });
    } else {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }
});