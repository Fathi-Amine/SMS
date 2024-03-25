const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../Models/Academic/AcademicTerm");
const Admin = require("../../Models/Staff/Admin");

exports.createAcademicTerm = AsyncHandler(async (req, res) => {
    try {
        const {name, description, duration} = req.body;
        const academicTerm = await AcademicTerm.findOne({name});
        if (academicTerm) {
            return res.status(400).json({ message: "Academic term already exists" });
        }
        const academicTermCreated = await AcademicTerm.create({
            name,
            description,
            duration,
            createdBy: req.user.id,
        });
        const admin = await Admin.findById(req.user.id);
        admin.academicTerm.push(academicTermCreated._id);
        await admin.save();
        res.status(201).json({
            status: "success",
            message: "Academic term created successfully",
            data: academicTermCreated,
        });
    }catch (error) {
        res.status(500).json({ message: error.message });

    }
});

exports.getAcademicTerms = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.find();

    res.status(200).json({
        status: "success",
        message: "Academic terms fetched successfully",
        data: academicTerms,
    });
});

exports.getAcademicTerm = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.findById(req.params.id);

    res.status(200).json({
        status: "success",
        message: "Academic term fetched successfully",
        data: academicTerms,
    });
});

exports.updateAcademicTerms = AsyncHandler(async (req, res) => {
    const { name, description, duration } = req.body;
    const updateData = {};

    if (name) {
        const existingTerm = await AcademicTerm.findOne({ name, _id: { $ne: req.params.id } });
        if (existingTerm) {
            return res.status(400).json({ message: "Academic term name already exists" });
        }
        updateData.name = name;
    }

    updateData.description = description;
    updateData.duration = duration;

    const academicTerms = await AcademicTerm.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );

    if (!academicTerms) {
        return res.status(404).json({ message: "Academic term not found" });
    }

    res.status(200).json({
        status: "success",
        message: "Academic term updated successfully",
        data: academicTerms,
    });
});


exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
    await AcademicTerm.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "success",
        message: "Academic term deleted successfully",
    });
});
