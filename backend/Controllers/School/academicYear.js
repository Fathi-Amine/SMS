const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../Models/Academic/AcademicYear");
const Admin = require("../../Models/Staff/Admin");

const createAcademicYear = AsyncHandler(async (req, res) => {
    const { name, fromYear, toYear } = req.body;
    //check if exists
    const academicYear = await AcademicYear.findOne({ name });
    if (academicYear) {
        res.status(400).json({message:'Academic year already exists'})
    }
    //create
    const academicYearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.user.id,
    });
    const admin = await Admin.findById(req.user.id);
    admin.academicYear.push(academicYearCreated._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Academic year created successfully",
        data: academicYearCreated,
    });
});

const getAcademicYears = AsyncHandler(async (req, res) => {
    const academicYears = await AcademicYear.find();

    res.status(200).json({
        status: "success",
        message: "Academic years fetched successfully",
        data: academicYears,
    });
});

const getAcademicYear = AsyncHandler(async (req, res) => {
    const academicYears = await AcademicYear.findById(req.params.id);

    res.status(200).json({
        status: "success",
        message: "Academic years fetched successfully",
        data: academicYears,
    });
});

const updateAcademicYear = AsyncHandler(async (req, res) => {
    const { name, fromYear, toYear } = req.body;
    const academicYear = await AcademicYear.findById(req.params.id);

    // Check if the name has been changed and if it already exists
    if (name) {
        const yearExists  = await AcademicYear.findOne({ name, _id: { $ne: req.params.id } });
        if (yearExists) {
            return res.status(400).json({message:"Academic year already exists"});
        }
    }

    academicYear.name = name;
    academicYear.fromYear = fromYear;
    academicYear.toYear = toYear;
    academicYear.createdBy = req.user.id;

    await academicYear.save();

    res.status(200).json({
        status: "success",
        message: "Academic years updated successfully",
        data: academicYear,
    });
});

const deleteAcademicYear = AsyncHandler(async (req, res) => {
    await AcademicYear.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "success",
        message: "Academic year deleted successfully",
    });
});

const pushStudentToAcademicYear = AsyncHandler(async (req, res) => {
    const { studentID, academicYearID } = req.body;
    const academicYear =
        await AcademicYear.findById(academicYearID);
    if (!academicYear) {
        res.status(404);
        throw new Error("Academic year not found");
    }
    academicYear.students.push(studentID);
    await academicYear.save();
    res.status(200).json({
        status: "success",
        message: "Student added to academic year successfully",
    });
});

const removeStudentFromAcademicYear = AsyncHandler(async (req, res) => {
    const { studentID, academicYearID } = req.body;
    const academicYear =
        await AcademicYear.findById(academicYearID);
    if (!academicYear) {
        res.status(404);
        throw new Error("Academic year not found");
    }
    academicYear.students = academicYear.students.filter(student => student !== studentID);
    await academicYear.save();
    res.status(200).json({
        status: "success",
        message: "Student removed from academic year successfully",
    });
});

const pullStudentFromAcademicYear = AsyncHandler(async (req, res) => {
    const { studentID, academicYearID } = req.body;
    const academicYear =
        await AcademicYear.findById(academicYearID);
    if (!academicYear) {
        res.status(404);
        throw new Error("Academic year not found");
    }
    academicYear.students.pull(studentID);
    await academicYear.save();
    res.status(200).json({
        status: "success",
        message: "Student removed from academic year successfully",
    });
});


module.exports = {
    createAcademicYear,
    getAcademicYears,
    getAcademicYear,
    updateAcademicYear,
    deleteAcademicYear,
    pushStudentToAcademicYear,
    removeStudentFromAcademicYear
}