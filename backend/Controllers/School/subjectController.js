const AsyncHandler = require("express-async-handler");
const Program = require("../../Models/Academic/Program");
const Subject = require("../../Models/Academic/Subject");
const Admin = require("../../Models/Staff/Admin");

exports.createSubject = AsyncHandler(async (req, res) => {
    const { name, description, academicTerm } = req.body;

    const programFound = await Program.findById(req.params.programID);
    if (!programFound) {
        throw new Error("Program  not found");
    }

    const subjectFound = await Subject.findOne({ name });
    if (subjectFound) {
        throw new Error("Subject  already exists");
    }

    const subjectCreated = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.user.id,
    });

    programFound.subjects.push(subjectCreated._id);
    await programFound.save();
    res.status(201).json({
        status: "success",
        message: "Subject created successfully",
        data: subjectCreated,
    });
});


exports.getSubjects = AsyncHandler(async (req, res) => {
    const classes = await Subject.find();
    res.status(201).json({
        status: "success",
        message: "Subjects fetched successfully",
        data: classes,
    });
});

exports.getProgram = AsyncHandler(async (req, res) => {
    const program = await Subject.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Subject fetched successfully",
        data: program,
    });
});


exports.updateSubject = AsyncHandler(async (req, res) => {
    const { name, description, academicTerm } = req.body;
    const updateData = {};

    if (name) { // Update name only if provided
        const existingSubject = await Subject.findOne({ name, _id: { $ne: req.params.id } }); // Exclude current subject
        if (existingSubject) {
            return res.status(400).json({ message: "Subject name already exists" });
        }
        updateData.name = name;
    }

    updateData.description = description;
    updateData.academicTerm = academicTerm;

    const subject = await Subject.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );

    if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({
        status: "success",
        message: "Subject updated successfully",
        data: subject,
    });
});

exports.deleteSubject = AsyncHandler(async (req, res) => {
    await Subject.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status: "success",
        message: "subject deleted successfully",
    });
});
