const express = require("express");
const {
    createProgram,
    deleteProgram,
    getProgram,
    getPrograms,
    updateProgram,
    addSubjectToProgram,
} = require("../../Controllers/School/programController");
const {authMiddleware} = require("../../Middlewares/authMiddleware");
const isAdminMiddleware = require("../../Middlewares/isAdminMiddleware");

const programRoutes = express.Router();

// academicTerRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicTerRouter.get("/", isLogin, isAdmin, getAcademicYears);

programRoutes
    .route("/")
    .post(authMiddleware, isAdminMiddleware, createProgram)
    .get(authMiddleware, getPrograms);

programRoutes
    .route("/:id")
    .get(authMiddleware, isAdminMiddleware, getProgram)
    .put(authMiddleware, isAdminMiddleware, updateProgram)
    .delete(authMiddleware, isAdminMiddleware, deleteProgram);

programRoutes.put("/:id/subjects", authMiddleware, isAdminMiddleware, addSubjectToProgram);

// academicTerRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicTerRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicTerRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = programRoutes;
