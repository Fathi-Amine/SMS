const express = require('express');
const studentRoutes = express.Router();
const {authMiddleware} = require('../../Middlewares/authMiddleware');
const isAdminMiddleware = require('../../Middlewares/isAdminMiddleware');
const isTeacherMiddleware = require('../../Middlewares/isTeacherMiddleware');
const {adminRegisterStudent, studentLogin} = require("../../Controllers/Students/studentController");

studentRoutes.post('/register', authMiddleware, isAdminMiddleware , adminRegisterStudent);
studentRoutes.post('/login', studentLogin);

module.exports = studentRoutes;