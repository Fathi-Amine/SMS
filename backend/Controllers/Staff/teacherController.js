const AysncHandler = require("express-async-handler");
const Teacher = require("../../Models/Staff/Teacher");
const { genPassword, validPassword } = require("../../utils/authUtils");
const Token = require("../../Models/Global/Token");
const {attachCookieToResponse} = require("../../Utils/authUtils");
const crypto = require("crypto");
const Admin = require("../../Models/Staff/Admin");
const Program = require("../../Models/Academic/Program")
const ClassLevel = require("../../Models/Academic/ClasseLevel")
const AcademicYear = require("../../Models/Academic/AcademicYear");
const Subject = require("../../Models/Academic/Subject");


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

exports.adminGettingAllTeachers = AysncHandler(async (req, res) => {
    const teachers = await Teacher.find().select("-hash -salt -token");
    res.status(200).json({
        status: "success",
        message: "Teachers fetched successfully",
        data: teachers,
    });
});

exports.getTeacherByAdmin = AysncHandler(async (req, res) => {
    const teacherID = req.params.teacherID;
    //find the teacher
    const teacher = await Teacher.findById(teacherID);
    if (!teacher) {
        throw new Error("Teacher not found");
    }
    res.status(200).json({
        status: "success",
        message: "Teacher fetched successfully",
        data: teacher,
    });
});

exports.getTeacherProfile = AysncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.user?.id).select(
        "-hash -salt -createdAt -updatedAt"
    );
    if (!teacher) {
        throw new Error("Teacher not found");
    }
    res.status(200).json({
        status: "success",
        data: teacher,
        message: "Teacher Profile fetched  successfully",
    });
});


exports.teacherUpdateProfile = AysncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const {hash, salt} = genPassword(password);
    if (email !== req.user.email) {
        const emailExists = await Teacher.findOne({email});
        if (emailExists) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }
    }
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.user.id, {
        name,
        email,
        hash,
        salt
    }, {new: true});
    return res.status(200).json({
        status: 'success',
        data: updatedTeacher,
        message: 'Teacher updated successfully'
    });
});


exports.adminUpdateTeacher = AysncHandler(async (req, res) => {
    const { program, classLevel, academicYear, subject } = req.body;
    const updates = {};
    //if email is taken
    const teacherFound = await Teacher.findById(req.params.teacherID);
    if (!teacherFound) {
        throw new Error("Teacher not found");
    }
    //Check if teacher is withdrawn
    if (teacherFound.isWitdrawn) {
        throw new Error("Action denied, teacher is withdraw");
    }
    //assign a program
    if (program) {
        const programExists = await Program.findOne({ name: program });
        if (!programExists) {
            throw new Error("Action denied, Program doesn't exist");
        }
        updates.program = programExists._id;
    }

    //assign Class level
    if (classLevel) {
        const classLevelExists = await ClassLevel.findOne({name:classLevel})
        if(!classLevelExists){
            throw new Error("Action denied, Class Level doesn't exist");
        }
        updates.classLevel = classLevelExists._id;
    }

    //assign Academic year
    if (academicYear) {
        const academicYearExists = await AcademicYear.findOne({name:academicYear})
        if(!academicYearExists){
            throw new Error("Action denied, Academic Year doesn't exist");
        }
        updates.academicYear = academicYearExists._id;
    }

    //assign subject
    if (subject) {
        const subjectExists = await Subject.findOne({name:subject});
        if (!subjectExists){
            throw new Error("Action denied, Subject doesn't exist");
        }
        const teacherSubjectExists = teacherFound.subject.some(
            (existingSubject) => existingSubject.toString() === subjectExists._id.toString()
        );

        if (teacherSubjectExists) {
            throw new Error("Subject already assigned to this teacher");
        } else {
            teacherFound.subject.push(subjectExists._id);
            updates.subject = teacherFound.subject.slice();
        }
    }

    const updatedTeacher = await Teacher.findOneAndUpdate(
        { _id: teacherFound._id },
        updates,
        { new: true }
    );
    console.log(updates);
    res.status(200).json({
        status: "success",
        data: updatedTeacher,
        message: "Teacher updated successfully",
    });

});
