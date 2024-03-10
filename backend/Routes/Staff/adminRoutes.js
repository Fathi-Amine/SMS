const express = require('express');
const adminRoutes = express.Router();

adminRoutes.post('/register', (req, res) => {
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

adminRoutes.post('/login', (req, res) => {
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

adminRoutes.post('/logout', (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin logged out successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
})

adminRoutes.get('/', (req, res) => {
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

adminRoutes.get('/:id', (req, res) => {
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
adminRoutes.put('/update-admin/:id', (req, res) => {
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
adminRoutes.delete('/delete-admin/:id', (req, res) => {
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
adminRoutes.put('/suspend/teacher/:id', (req, res) => {
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
adminRoutes.put('/activate/teacher/:id', (req, res) => {
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
adminRoutes.put('/withdraw/teacher/:id', (req, res) => {
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
adminRoutes.put('/unwithdraw/teacher/:id', (req, res) => {
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
adminRoutes.put('/publish/exam/results/:id', (req, res) => {
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
adminRoutes.put('/unpublish/exam/results/:id', (req, res) => {
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

module.exports = adminRoutes;