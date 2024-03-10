const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.post('/api/v1/admins/register', (req, res) => {
    try {
        res.status(201).json({
            message: 'Admin registered successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

app.post('/api/v1/admins/login', (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin logged in successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

app.post('/api/v1/admins/logout', (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin logged out successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// Get all admins
app.get('/api/v1/admins', (req, res) => {
    try {
        res.status(200).json({
            message: 'All admins retrieved successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// Get a single admin
app.get('/api/v1/admins/:id', (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin retrieved successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// Update a single admin
app.put('/api/v1/admins/:id', (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin updated successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// Delete a single admin
app.delete('/api/v1/admins/:id', (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin deleted successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// admin suspending teacher
app.put('/api/v1/admins/suspend/teacher/:id', (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher suspended successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// admin activating teacher
app.put('/api/v1/admins/activate/teacher/:id', (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher activated successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// admin withdrawing teacher
app.put('/api/v1/admins/withdraw/teacher/:id', (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher withdrawn successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// admin unwithdrawing teacher
app.put('/api/v1/admins/unwithdraw/teacher/:id', (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher unwithdrawn successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// admin publishing exam results
app.put('/api/v1/admins/publish/exam/results/:id', (req, res) => {
    try {
        res.status(200).json({
            message: 'Exam results published successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// admin unpublishing exam results
app.put('/api/v1/admins/unpublish/exam/results/:id', (req, res) => {
    try {
        res.status(200).json({
            message: 'Exam results unpublished successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});


module.exports = app;