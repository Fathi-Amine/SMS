require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const adminRoutes = require('../Routes/Staff/adminRoutes');
const {errorHandlingMiddleware, notFoundError} = require('../Middlewares/ErrorHandlingMiddleware');
const cookieParser = require('cookie-parser');

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api/v1/admins', adminRoutes);
app.use(notFoundError)
app.use(errorHandlingMiddleware);


module.exports = app;