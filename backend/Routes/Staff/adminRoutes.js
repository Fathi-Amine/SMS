const express = require('express');
const {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAllAdmins,
    getAdminProfile,
    updateAdmin,
    deleteAdmin,
    suspendTeacher,
    unsuspendTeacher,
    withdrawTeacher,
    unwithdrawTeacher,
    publishExamResults,
    unpublishExamResults
} = require("../../Controllers/Staff/adminController");
const {isLoggedIn, authMiddleware} = require('../../Middlewares/authMiddleware');

const adminRoutes = express.Router();

adminRoutes.post('/register', registerAdmin);

adminRoutes.post('/login', loginAdmin);

adminRoutes.post('/logout', logoutAdmin)

adminRoutes.get('/',authMiddleware, getAllAdmins);

adminRoutes.get('/:id', authMiddleware, getAdminProfile);

// Update a single admin
adminRoutes.put('/update-admin/:id', updateAdmin);

// Delete a single admin
adminRoutes.delete('/delete-admin/:id', deleteAdmin);

// admin suspending teacher
adminRoutes.put('/suspend/teacher/:id', suspendTeacher);

// admin activating teacher
adminRoutes.put('/activate/teacher/:id', unsuspendTeacher);

// admin withdrawing teacher
adminRoutes.put('/withdraw/teacher/:id', withdrawTeacher);

// admin unwithdrawing teacher
adminRoutes.put('/unwithdraw/teacher/:id', unwithdrawTeacher);

// admin publishing exam results
adminRoutes.put('/publish/exam/results/:id', publishExamResults);

// admin unpublishing exam results
adminRoutes.put('/unpublish/exam/results/:id', unpublishExamResults);

module.exports = adminRoutes;