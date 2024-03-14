const AysncHandler = require("express-async-handler");
const Exam = require("../../Models/Academic/Exam");
const Teacher = require("../../Models/Staff/Teacher");


exports.createExam = AysncHandler(async (req, res) => {
    console.log(req.user.id)
    const {
        name,
        description,
        subject,
        program,
        academicTerm,
        duration,
        examDate,
        examTime,
        examType,
        academicYear,
        classLevel
    } = req.body;
    //find teacher
    const teacherFound = await Teacher.findById(req.user.id);
    if (!teacherFound) {
        throw new Error("Teacher not found");
    }
    //exam exists
    const examExists = await Exam.findOne({ name });
    if (examExists) {
        throw new Error("Exam already exists");
    }
    //create
    const examCreated = await Exam.create({
        name,
        description,
        academicTerm,
        academicYear,
        classLevel,
        createdBy: req.user. id,
        duration,
        examDate,
        examTime,
        examType,
        subject,
        program,
    });
    //push the exam into teacher
    teacherFound.examsCreated.push(examCreated._id);
    await teacherFound.save();
    res.status(201).json({
        status: "success",
        message: "Exam created",
        data: examCreated,
    });
});

exports.getExams = AysncHandler(async (req, res) => {
    const exams = await Exam.find().populate({
        path: "questions",
        populate: {
            path: "createdBy",
            select: "name email",
        },
    });
    res.status(201).json({
        status: "success",
        message: "Exams fetched successfully",
        data: exams,
    });
});

exports.getExam = AysncHandler(async (req, res) => {
    const exams = await Exam.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Exam fetched successfully",
        data: exams,
    });
});

exports.updateExam = AysncHandler(async (req, res) => {
    const {
        name,
        description,
        subject,
        program,
        academicTerm,
        duration,
        examDate,
        examTime,
        examType,
        createdBy,
        academicYear,
        classLevel,
    } = req.body;
    //check name exists
    const examFound = await Exam.findOne({ name, _id: { $ne: req.params.id } });
    if (examFound) {
        throw new Error("Exam already exists");
    }

    const examUpdated = await Exam.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            subject,
            program,
            academicTerm,
            duration,
            examDate,
            examTime,
            examType,
            academicYear,
            classLevel,
            createdBy: req.user.id,
        },
        {
            new: true,
        }
    );

    res.status(201).json({
        status: "success",
        message: "Exam  updated successfully",
        data: examUpdated,
    });
});