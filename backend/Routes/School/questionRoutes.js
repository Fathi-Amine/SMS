const express = require("express");
const { createQuestion, getQuestions, getQuestion, updateQuestion } = require("../../Controllers/School/questionsController");
const isTeacherMiddleware = require("../../Middlewares/isTeacherMiddleware");
const {authMiddleware} = require("../../Middlewares/authMiddleware");

const questionsRoutes = express.Router();

questionsRoutes.post("/:examID", authMiddleware, isTeacherMiddleware, createQuestion);
questionsRoutes.get("/all", authMiddleware, isTeacherMiddleware, getQuestions);
questionsRoutes.get("/:id", authMiddleware, isTeacherMiddleware, getQuestion);
questionsRoutes.put("/update/:id", authMiddleware, isTeacherMiddleware, updateQuestion);

module.exports = questionsRoutes;