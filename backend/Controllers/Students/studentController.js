const AsyncHandler = require("express-async-handler");
const {genPassword, validPassword, attachCookieToResponse} = require("../../Utils/authUtils");
const Student = require("../../Models/Academic/Student");
const Token = require("../../Models/Global/Token");
const crypto = require("crypto");
const AysncHandler = require("express-async-handler");
const Teacher = require("../../Models/Staff/Teacher");
const Exam = require("../../Models/Academic/Exam");
const ExamResult = require("../../Models/Academic/ExamResults");


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

exports.getStudentProfile = AysncHandler(async (req, res) => {
    const student = await Student.findById(req.user?.id).select(
        "-hash -salt -createdAt -updatedAt"
    );
    if (!student) {
        throw new Error("Student not found");
    }
    res.status(200).json({
        status: "success",
        data: student,
        message: "Student Profile fetched  successfully",
    });
});

exports.adminGettingAllStudents = AsyncHandler(async (req, res) => {
    const students = await Student.find().select("-hash -salt -token");
    res.status(200).json({
        status: "success",
        message: "Teachers fetched successfully",
        data: students,
    });
});

exports.getStudentByAdmin = AysncHandler(async (req, res) => {
    const studentId = req.params.studentId;
    //find the teacher
    const student = await Student.findById(studentId);
    if (!student) {
        throw new Error("Student not found");
    }
    res.status(200).json({
        status: "success",
        message: "Teacher fetched successfully",
        data: student,
    });
});

exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const {hash, salt} = genPassword(password);
    if (email !== req.user.email) {
        const emailExists = await Student.findOne({email});
        if (emailExists) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }
    }
    const updatedStudent = await Student.findByIdAndUpdate(req.user.id, {
        name,
        email,
        hash,
        salt
    }, {new: true});
    return res.status(200).json({
        status: 'success',
        data: updatedStudent,
        message: 'Student updated successfully'
    });
});

exports.adminUpdateStudent = AysncHandler(async (req, res) => {
    const { classLevels, academicYear, program, prefectName } =
        req.body;

    //find the student by id
    const studentFound = await Student.findById(req.params.studentId);
    if (!studentFound) {
        throw new Error("Student not found");
    }

    //update
    const studentUpdated = await Student.findByIdAndUpdate(
        req.params.studentId,
        {
            $set: {
                academicYear,
                program,
                prefectName,
            },
            $addToSet: {
                classLevels,
            },
        },
        {
            new: true,
        }
    );
    //send response
    res.status(200).json({
        status: "success",
        data: studentUpdated,
        message: "Student updated successfully",
    });
});

exports.writeExam = AysncHandler(async (req, res) => {
    //get student
    const studentFound = await Student.findById(req.user.id);
    if (!studentFound) {
        throw new Error("Student not found");
    }
    //Get exam
    const examFound = await Exam.findById(req.params.examID)
        .populate("questions")
        /*.populate("academicTerm");*/

    if (!examFound) {
        throw new Error("Exam not found");
    }
    //get questions
    const questions = examFound?.questions;
    //get students questions
    const studentAnswers = req.body.answers;

    //check if student answered all questions
    if (studentAnswers.length !== questions.length) {
        throw new Error("You have not answered all the questions");
    }

    // //check if student has already taken the exams
    const studentFoundInResults = await ExamResult.findOne({
        student: studentFound?._id,
    });
    if (studentFoundInResults) {
        throw new Error("You have already written this exam");
    }

    //check if student is suspende/withdrawn
    if (studentFound.isWithdrawn || studentFound.isSuspended) {
        throw new Error("You are suspended/withdrawn, you can't take this exam");
    }

    //Build report object
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let status = "";
    let grade = 0;
    let remarks = "";
    let score = 0;
    let answeredQuestions = [];

    //check for answers
    for (let i = 0; i < questions.length; i++) {
        //find the question
        const question = questions[i];
        //check if the answer is correct
        if (question.correctAnswer === studentAnswers[i]) {
            correctAnswers++;
            score++;
            question.isCorrect = true;
        } else {
            wrongAnswers++;
        }
    }
    //calculate reports
    totalQuestions = questions.length;
    grade = (correctAnswers / questions.length) * 100;
    answeredQuestions = questions.map(question => {
        return {
            question: question.question,
            correctAnswer: question.correctAnswer,
            isCorrect: question.isCorrect,
        };
    });

    //calculate status
    if (grade >= 50) {
        status = "Pass";
    } else {
        status = "Fail";
    }

    //Remarks
    if (grade >= 80) {
        remarks = "Excellent";
    } else if (grade >= 70) {
        remarks = "Very Good";
    } else if (grade >= 60) {
        remarks = "Good";
    } else if (grade >= 50) {
        remarks = "Fair";
    } else {
        remarks = "Poor";
    }

    //Generate Exam results
    const examResults = await ExamResult.create({
        studentID: studentFound?.studentId,
        exam: examFound?._id,
        grade,
        score,
        status,
        remarks,
        classLevel: examFound?.classLevel,
        academicTerm: examFound?.academicTerm,
        academicYear: examFound?.academicYear,
        answeredQuestions: answeredQuestions,
    });
    // //push the results into
    studentFound.examResults.push(examResults?._id);
    // //save
    await studentFound.save();



    res.status(200).json({
        status: "success",
        data: "You have submitted your exam. Check later for the results",
    });
});