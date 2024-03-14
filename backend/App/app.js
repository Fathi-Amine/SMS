require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const adminRoutes = require('../Routes/Staff/adminRoutes');
const {errorHandlingMiddleware, notFoundError} = require('../Middlewares/ErrorHandlingMiddleware');
const cookieParser = require('cookie-parser');
const academicYearRoutes = require("../Routes/School/academicYearRoutes");
const academicTermRoutes = require("../Routes/School/academicTermRoutes");
const classLevelRoutes = require("../Routes/School/classLevelRoutes");
const programRoutes = require("../Routes/School/programRoutes");
const subjectRoutes = require("../Routes/School/subjectRoutes");
const yearGroupRoutes = require("../Routes/School/yearGroupRoutes");
const teacherRoutes = require("../Routes/Staff/teacherRoutes");
const examRoutes = require("../Routes/School/examRoutes");

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/academic-years', academicYearRoutes);
app.use('/api/v1/academic-terms', academicTermRoutes);
app.use('/api/v1/class-levels', classLevelRoutes);
app.use('/api/v1/programs', programRoutes);
app.use('/api/v1/subjects', subjectRoutes);
app.use('/api/v1/year-groups', yearGroupRoutes);
app.use('/api/v1/teachers', teacherRoutes);
app.use('/api/v1/exams', examRoutes);
app.use(notFoundError)
app.use(errorHandlingMiddleware);


module.exports = app;