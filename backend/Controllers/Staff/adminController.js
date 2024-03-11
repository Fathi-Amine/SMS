const Admin = require('../../Models/Staff/Admin');
const AsyncHandler = require('express-async-handler');

const registerAdmin = AsyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const adminFound = await Admin.findOne({email});
    if (adminFound) {
        const error = new Error('Admin already exists');
        error.statusCode = 409;
        throw error;
    }
    const user = await Admin.create({
        name,
        email,
        password
    });
    res.status(201).json({data: user, message: 'Admin created successfully'});
})

const loginAdmin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const admin = await Admin.findOne({email});
        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });
        }

        if(admin && (await admin.comparePassword(password))) {
            req.isAuthenticated = true;
            return res.status(200).json({
                data: {
                    name: admin.name,
                    email: admin.email,
                    role: admin.role
                },
                message: 'Admin logged in successfully'
            });
        }else {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
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