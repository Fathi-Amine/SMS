const express = require('express');
const morgan = require('morgan');
const app = express();
const adminRoutes = require('../Routes/Staff/adminRoutes');

app.use(morgan('dev'));

app.use('/api/v1/admins', adminRoutes);


module.exports = app;