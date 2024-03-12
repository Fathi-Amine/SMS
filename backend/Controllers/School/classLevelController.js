const AysncHandler = require("express-async-handler");
const ClassLevel = require("../../Models/Academic/ClasseLevel");
const Admin = require("../../Models/Staff/Admin");

exports.createClassLevel = AysncHandler(async (req, res) => {
    const { name, description, duration } = req.body;
    //check if exists
    const classFound = await ClassLevel.findOne({ name });
    if (classFound) {
        throw new Error("Class  already exists");
    }
    //create
    const classCreated = await ClassLevel.create({
        name,
        description,
        createdBy: req.user.id,
    });
    //push class into admin
    const admin = await Admin.findById(req.user.id);
    admin.classLevels.push(classCreated._id);
    //save
    await admin.save();

    res.status(201).json({
        status: "success",
        message: "Class created successfully",
        data: classCreated,
    });
});

exports.getClassLevels = AysncHandler(async (req, res) => {
    const classes = await ClassLevel.find();
    res.status(201).json({
        status: "success",
        message: "Class Levels fetched successfully",
        data: classes,
    });
});

exports.getClassLevel = AysncHandler(async (req, res) => {
    const classLevel = await ClassLevel.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Class fetched successfully",
        data: classLevel,
    });
});


exports.updateclassLevel = async (req, res) => {
    const { name, description } = req.body;
    const updateData = {};

    if (name) { // Update name only if provided
        const existingClass = await ClassLevel.findOne({ name, _id: { $ne: req.params.id } }); // Exclude current class level
        if (existingClass) {
            return res.status(400).json({ message: "Class level name already exists" });
        }
        updateData.name = name;
    }

    updateData.description = description;

    const classLevel = await ClassLevel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );

    if (!classLevel) {
        return res.status(404).json({ message: "Class level not found" });
    }

    res.status(200).json({
        status: "success",
        message: "Class level updated successfully",
        data: classLevel,
    });
};


exports.deleteClassLevel = AysncHandler(async (req, res) => {
    await ClassLevel.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Class level deleted successfully",
    });
});
