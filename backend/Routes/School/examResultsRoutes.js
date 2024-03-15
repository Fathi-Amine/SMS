const express = require("express");
const {
    checkExamResults,
    getAllExamResults,
    adminToggleExamResult,
} = require("../../Controllers/School/examResultsController");
const isAdminMiddleware = require("../../Middlewares/isAdminMiddleware");
const {authMiddleware} = require("../../Middlewares/authMiddleware");
const isStudentMiddleware = require("../../Middlewares/isStudentMiddleware");

const examResultRoutes = express.Router();

examResultRoutes.get("/", authMiddleware, isStudentMiddleware, getAllExamResults);
examResultRoutes.get(
    "/:id/checking",
    authMiddleware,
    isStudentMiddleware,
    checkExamResults
);

examResultRoutes.put(
    "/:id/admin-toggle-publish",
    authMiddleware,
    isAdminMiddleware,
    adminToggleExamResult
);
module.exports = examResultRoutes;
