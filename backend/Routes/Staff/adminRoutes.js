const express = require('express');
const {registerAdmin, loginAdmin, logoutAdmin, getAllAdmins, getSingleAdmin, updateAdmin, deleteAdmin, suspendTeacher,
    unsuspendTeacher, withdrawTeacher, unwithdrawTeacher, publishExamResults, unpublishExamResults
} = require("../../Controllers/Staff/adminController");
const adminRoutes = express.Router();

adminRoutes.post('/register', registerAdmin);

adminRoutes.post('/login', loginAdmin);

adminRoutes.post('/logout', logoutAdmin)

adminRoutes.get('/', getAllAdmins);

adminRoutes.get('/:id', getSingleAdmin);

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