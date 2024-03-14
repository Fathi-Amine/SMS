const AsyncHandler = require("express-async-handler");
const Exam = require("../../Models/Academic/Exam");
const Question = require("../../Models/Academic/Questions");


exports.createQuestion = AsyncHandler(async (req, res) => {
    const { question, optionA, optionB, optionC, optionD, correctAnswer } =
        req.body;
    //find the exam
    const examFound = await Exam.findById(req.params.examID);
    if (!examFound) {
        throw new Error("Exam not found");
    }

    const questionExists = await Question.findOne({ question });
    if (questionExists) {
        throw new Error("Question already exists");
    }
    //create exam
    const questionCreated = await Question.create({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        createdBy: req.user.id,
    });
    //add the question into exam
    examFound.questions.push(questionCreated?._id);
    //save
    await examFound.save();
    res.status(201).json({
        status: "success",
        message: "Question created",
        data: questionCreated,
    });
});

exports.getQuestions = AsyncHandler(async (req, res) => {
    const questions = await Question.find();
    res.status(201).json({
        status: "success",
        message: "Question fetched successfully",
        data: questions,
    });
});

exports.getQuestion = AsyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Question fetched successfully",
        data: question,
    });
});

exports.updateQuestion = AsyncHandler(async (req, res) => {
    const { question, optionA, optionB, optionC, optionD, correctAnswer } =
        req.body;
    const questionFound = await Question.findById(req.params.id);
    if (!questionFound) {
        throw new Error("Question not found");
    }
    questionFound.question = question;
    questionFound.optionA = optionA;
    questionFound.optionB = optionB;
    questionFound.optionC = optionC;
    questionFound.optionD = optionD;
    questionFound.correctAnswer = correctAnswer;
    questionFound.createdBy = req.user.id;
    await questionFound.save();
    res.status(201).json({
        status: "success",
        message: "Question updated successfully",
        data: questionFound,
    });
});
