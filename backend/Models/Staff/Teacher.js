const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: true,
        },

        salt: {
            type: String,
            required: true,
        },
        token: {
            type: mongoose.Types.ObjectId,
            ref: 'Token'
        },
        dateEmployed: {
            type: Date,
            default: Date.now,
        },
        teacherId: {
            type: String,
            required: true,
            default: function () {
                return (
                    "TEA" +
                    Math.floor(100 + Math.random() * 900) +
                    Date.now().toString().slice(2, 4) +
                    this.name
                        .split(" ")
                        .map(name => name[0])
                        .join("")
                        .toUpperCase()
                );
            },
        },
        //if witdrawn, the teacher will not be able to login
        isWitdrawn: {
            type: Boolean,
            default: false,
        },
        //if suspended, the teacher can login but cannot perform any task
        isSuspended: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: "teacher",
        },
        subject: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
        }],
        applicationStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program"
        },
        classLevel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClassLevel"
        },
        academicYear: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicYear"
        },
        examsCreated: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exam",
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            // required: true,
        },
        academicTerm: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicTerm"
        },
    },
    {
        timestamps: true,
    }
);

//model
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
