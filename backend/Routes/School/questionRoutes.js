const express = require("express");
const { createQuestion } = require("../../Controllers/School/questionsController");
const isTeacherMiddleware = require("../../Middlewares/isTeacherMiddleware");
const {authMiddleware} = require("../../Middlewares/authMiddleware");

const questionsRoutes = express.Router();

questionsRoutes.post("/:examID", authMiddleware, isTeacherMiddleware, createQuestion);

module.exports = questionsRoutes;