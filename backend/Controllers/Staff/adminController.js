const Admin = require('../../Models/Staff/Admin');

const registerAdmin = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const adminFound = await Admin.findOne({email});
        if (adminFound) {
            return res.status(409).json({
                message: 'Admin already exists'
            });
        }
        const user = await Admin.create({
            name,
            email,
            password
        });
        res.status(201).json({data: user, message: 'Admin created successfully'});
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const loginAdmin = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin logged in successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const logoutAdmin =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin logged out successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const getAllAdmins =async (req, res) => {
    try {
        res.status(200).json({
            message: 'All admins retrieved successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const getSingleAdmin =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin retrieved successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const updateAdmin =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin updated successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const deleteAdmin =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin deleted successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const suspendTeacher =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher suspended successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const unsuspendTeacher =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher activated successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const withdrawTeacher =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher withdrawn successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const unwithdrawTeacher =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Teacher unwithdrawn successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const publishExamResults =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Exam results published successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const unpublishExamResults =async (req, res) => {
    try {
        res.status(200).json({
            message: 'Exam results unpublished successfully'
        });
    }catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
module.exports = {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
    suspendTeacher,
    unsuspendTeacher,
    withdrawTeacher,
    unwithdrawTeacher,
    publishExamResults,
    unpublishExamResults
}