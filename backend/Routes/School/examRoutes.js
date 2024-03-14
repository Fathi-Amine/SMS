const express = require("express");
const {
    createExam,
    getExams,
    getExam,
    updateExam
} = require("../../Controllers/School/examsController");
const isTeacherMiddleware = require("../../Middlewares/isTeacherMiddleware");
const {authMiddleware} = require("../../Middlewares/authMiddleware");

const examRoutes = express.Router();

/*examRoutes.route("/", authMiddleware, isTeacherMiddleware).post(createExam).get(getExams);*/
examRoutes.post("/", authMiddleware, isTeacherMiddleware, createExam);
examRoutes.get("/", authMiddleware, getExams);
examRoutes.get("/:id", authMiddleware, getExam);
examRoutes.put("/:id", authMiddleware, isTeacherMiddleware, updateExam);

module.exports = examRoutes;