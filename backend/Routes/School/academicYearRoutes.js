const express = require("express");
const {
    createAcademicYear,
    getAcademicYears,
    getAcademicYear,
    updateAcademicYear,
    deleteAcademicYear, pushStudentToAcademicYear,
} = require("../../Controllers/School/academicYear");
const isAdmin = require("../../Middlewares/isAdminMiddleware");
const {authMiddleware} = require("../../Middlewares/authMiddleware");

const academicYearRoutes = express.Router();

academicYearRoutes.post("/", authMiddleware, isAdmin, createAcademicYear);
academicYearRoutes.get("/", authMiddleware, getAcademicYears);
academicYearRoutes.put("/assign", authMiddleware, isAdmin, pushStudentToAcademicYear);
academicYearRoutes.get("/:id", authMiddleware, isAdmin, getAcademicYear);
academicYearRoutes.put("/:id", authMiddleware, isAdmin, updateAcademicYear);
academicYearRoutes.delete("/:id", authMiddleware, isAdmin, deleteAcademicYear);
module.exports = academicYearRoutes;