const express = require('express');
const {adminRegisterTeacher, teacherLogin} = require("../../Controllers/Staff/teacherController");
const teacherRoutes = express.Router();

const {authMiddleware} = require('../../Middlewares/authMiddleware');
const isAdminMiddleware = require('../../Middlewares/isAdminMiddleware');

teacherRoutes.post('/register', authMiddleware, isAdminMiddleware , adminRegisterTeacher);

teacherRoutes.post('/login', teacherLogin);

module.exports = teacherRoutes;
