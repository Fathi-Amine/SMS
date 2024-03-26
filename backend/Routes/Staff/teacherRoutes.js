const express = require('express');
const {adminRegisterTeacher, teacherLogin, adminGettingAllTeachers, getTeacherByAdmin, getTeacherProfile, teacherUpdateProfile, adminUpdateTeacher,
    logoutTeacher
} = require("../../Controllers/Staff/teacherController");
const teacherRoutes = express.Router();

const {authMiddleware} = require('../../Middlewares/authMiddleware');
const isAdminMiddleware = require('../../Middlewares/isAdminMiddleware');
const isTeacherMiddleware = require('../../Middlewares/isTeacherMiddleware');

teacherRoutes.post('/register', authMiddleware, isAdminMiddleware , adminRegisterTeacher);

teacherRoutes.post('/login', teacherLogin);

teacherRoutes.delete('/logout', authMiddleware, isTeacherMiddleware, logoutTeacher);

teacherRoutes.get('/all', authMiddleware, isAdminMiddleware, adminGettingAllTeachers);

teacherRoutes.get("/profile", authMiddleware, isTeacherMiddleware, getTeacherProfile);

teacherRoutes.get("/:teacherID/admin", authMiddleware, isAdminMiddleware, getTeacherByAdmin);

teacherRoutes.put("/update-profile", authMiddleware, isTeacherMiddleware, teacherUpdateProfile);

teacherRoutes.put("/update/:teacherID/admin", authMiddleware, isAdminMiddleware, adminUpdateTeacher);
module.exports = teacherRoutes;
