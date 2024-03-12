const express = require("express");
const {
    createAcademicTerm,
    deleteAcademicTerm,
    getAcademicTerm,
    getAcademicTerms,
    updateAcademicTerms,
} = require("../../Controllers/School/academicTermController");

const {authMiddleware} = require("../../Middlewares/authMiddleware");
const isAdmin = require("../../Middlewares/isAdminMiddleware");

const academicTermRoutes = express.Router();

// academicTerRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicTerRouter.get("/", isLogin, isAdmin, getAcademicYears);

academicTermRoutes
    .route("/")
    .post(authMiddleware, isAdmin, createAcademicTerm)
    .get(authMiddleware, isAdmin, getAcademicTerms);

academicTermRoutes
    .route("/:id")
    .get(authMiddleware, isAdmin, getAcademicTerm)
    .put(authMiddleware, isAdmin, updateAcademicTerms)
    .delete(authMiddleware, isAdmin, deleteAcademicTerm);

// academicTerRouter.get("/:id", authMiddleware, isAdmin, getAcademicYear);
// academicTerRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicTerRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = academicTermRoutes;
