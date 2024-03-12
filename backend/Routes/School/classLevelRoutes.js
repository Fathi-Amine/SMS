const express = require("express");
const {
    createClassLevel,
    deleteClassLevel,
    getClassLevel,
    getClassLevels,
    updateclassLevel,
} = require("../../Controllers/School/classLevelController");

const {authMiddleware} = require("../../Middlewares/authMiddleware");
const isAdminMiddleware = require("../../Middlewares/isAdminMiddleware");

const classLevelRoutes = express.Router();

// academicTerRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicTerRouter.get("/", isLogin, isAdmin, getAcademicYears);

classLevelRoutes
    .route("/")
    .post(authMiddleware, isAdminMiddleware,createClassLevel)
    .get(authMiddleware, isAdminMiddleware ,getClassLevels);

classLevelRoutes
    .route("/:id")
    .get(authMiddleware, isAdminMiddleware ,getClassLevel)
    .put(authMiddleware, isAdminMiddleware ,updateclassLevel)
    .delete(authMiddleware, isAdminMiddleware ,deleteClassLevel);

// academicTerRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicTerRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicTerRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = classLevelRoutes;
