const express = require("express");
const {
    createSubject,
    deleteSubject,
    getProgram,
    getSubjects,
    updateSubject,
} = require("../../Controllers/School/subjectController");

const {authMiddleware} = require("../../Middlewares/authMiddleware");
const isAdminMiddleware = require("../../Middlewares/isAdminMiddleware");

const subjectRoutes = express.Router();

subjectRoutes.post("/:programID", authMiddleware, isAdminMiddleware, createSubject);

subjectRoutes.get("/", authMiddleware, getSubjects);

subjectRoutes.get("/:id", authMiddleware, isAdminMiddleware, getProgram);
subjectRoutes.put("/:id", authMiddleware, isAdminMiddleware, updateSubject);
subjectRoutes.delete("/:id", authMiddleware, isAdminMiddleware, deleteSubject);

module.exports = subjectRoutes;