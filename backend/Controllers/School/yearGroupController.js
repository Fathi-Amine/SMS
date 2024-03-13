const AsyncHandler = require("express-async-handler");
const Program = require("../../Models/Academic/Program");
const Subject = require("../../Models/Academic/Subject");
const YearGroup = require("../../Models/Academic/YearGroup");
const Admin = require("../../Models/Staff/Admin");


exports.createYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body;

    //check if exists
    const yeargroup = await YearGroup.findOne({ name });
    if (yeargroup) {
        throw new Error("Year Group/Graduation   already exists");
    }
    //create
    const yearGroup = await YearGroup.create({
        name,
        academicYear,
        createdBy: req.user.id,
    });

    const admin = await Admin.findById(req.user.id);
    if (!admin) {
        throw new Error("Admin not found");
    }
    admin.yearGroups.push(yearGroup._id);
    //save
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Year Group created successfully",
        data: yearGroup,
    });
});

exports.getYearGroups = AsyncHandler(async (req, res) => {
    const groups = await YearGroup.find();
    res.status(201).json({
        status: "success",
        message: "Year Groups fetched successfully",
        data: groups,
    });
});


exports.getYearGroup = AsyncHandler(async (req, res) => {
    const group = await YearGroup.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Year Group fetched successfully",
        data: group,
    });
});


exports.updateYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body;
    const updateData = {};

    if (name) { // Update name only if provided
        const existingYearGroup = await YearGroup.findOne({ name, _id: { $ne: req.params.id } }); // Exclude current year group
        if (existingYearGroup) {
            return res.status(400).json({ message: "Year group name already exists" });
        }
        updateData.name = name;
    }

    updateData.academicYear = academicYear;

    const yearGroup = await YearGroup.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );

    if (!yearGroup) {
        return res.status(404).json({ message: "Year group not found" });
    }

    res.status(200).json({
        status: "success",
        message: "Year group updated successfully",
        data: yearGroup,
    });
})

exports.deleteYearGroup = AsyncHandler(async (req, res) => {
    await YearGroup.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Year Group deleted successfully",
    });
});
