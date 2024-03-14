const express = require('express');
const studentRoutes = express.Router();
const {authMiddleware} = require('../../Middlewares/authMiddleware');
const isAdminMiddleware = require('../../Middlewares/isAdminMiddleware');
const isTeacherMiddleware = require('../../Middlewares/isTeacherMiddleware');
const {adminRegisterStudent, studentLogin, getStudentProfile, adminGettingAllStudents, getStudentByAdmin, studentUpdateProfile, adminUpdateStudent} = require("../../Controllers/Students/studentController");
const isStudentMiddleware = require("../../Middlewares/isStudentMiddleware");

studentRoutes.post('/register', authMiddleware, isAdminMiddleware , adminRegisterStudent);
studentRoutes.post('/login', studentLogin);
studentRoutes.get('/profile', authMiddleware,isStudentMiddleware, getStudentProfile);
studentRoutes.get('/all', authMiddleware, isAdminMiddleware, adminGettingAllStudents);
studentRoutes.get("/:studentId/admin", authMiddleware, isAdminMiddleware, getStudentByAdmin);
studentRoutes.put("/update-profile", authMiddleware, isStudentMiddleware, studentUpdateProfile);
studentRoutes.put("/update/:studentId/admin", authMiddleware, isAdminMiddleware, adminUpdateStudent);

module.exports = studentRoutes;