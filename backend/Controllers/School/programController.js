const AsyncHandler = require("express-async-handler");
const ClassLevel = require("../../Models/Academic/ClasseLevel");
const Program = require("../../Models/Academic/Program");
const Admin = require("../../Models/Staff/Admin");


exports.createProgram = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const programFound = await Program.findOne({ name });
    if (programFound) {
        throw new Error("Program  already exists");
    }
    const programCreated = await Program.create({
        name,
        description,
        createdBy: req.user.id,
    });
    const admin = await Admin.findById(req.user.id);
    admin.programs.push(programCreated._id);
    await admin.save();

    res.status(201).json({
        status: "success",
        message: "Program created successfully",
        data: programCreated,
    });
});


exports.getPrograms = AsyncHandler(async (req, res) => {
    const classes = await Program.find();
    res.status(201).json({
        status: "success",
        message: "Programs fetched successfully",
        data: classes,
    });
});

exports.getProgram = AsyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Program fetched successfully",
        data: program,
    });
});

exports.updateProgram = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const updateData = {};

    if (name) { // Update name only if provided
        const existingProgram = await Program.findOne({ name, _id: { $ne: req.params.id } }); // Exclude current program
        if (existingProgram) {
            return res.status(400).json({ message: "Program name already exists" });
        }
        updateData.name = name;
    }

    updateData.description = description;

    const program = await Program.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );

    if (!program) {
        return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({
        status: "success",
        message: "Program updated successfully",
        data: program,
    });
});

exports.deleteProgram = AsyncHandler(async (req, res) => {
    await Program.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Program deleted successfully",
    });
});


exports.addSubjectToProgram = AsyncHandler(async (req, res) => {
    const { name } = req.body;
    //get the program
    const program = await Program.findById(req.params.id);
    if (!program) {
        throw new Error("Program not found");
    }
    //Find the subject
    const subjectFound = await Subject.findOne({ name });
    if (!subjectFound) {
        throw new Error("Subject not found");
    }
    //Check if subject exists
    const subjectExists = program.subjects?.find(
        sub => sub?.toString() === subjectFound?._id.toString()
    );
    if (subjectExists) {
        throw new Error("Subject already exists");
    }
    //push the subj into program
    program.subjects.push(subjectFound?._id);
    //save
    await program.save();
    res.status(201).json({
        status: "success",
        message: "Subject added successfully",
        data: program,
    });
});
