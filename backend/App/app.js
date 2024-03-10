const express = require('express');
const morgan = require('morgan');
const app = express();
const adminRoutes = require('../Routes/Staff/adminRoutes');
const {errorHandlingMiddleware, notFoundError} = require('../Middlewares/ErrorHandlingMiddleware');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/admins', adminRoutes);
app.use(notFoundError)
app.use(errorHandlingMiddleware);


module.exports = app;