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
