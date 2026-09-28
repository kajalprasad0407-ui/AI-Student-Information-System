const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    rollNo: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    attendance: {
      type: Number,
      required: true,
    },

    marks: {
      type: Number,
      required: true,
    },

    performance: {
      type: String,
      required: true,
    },

    subjects: [
      {
        name: String,
        marks: Number,
        attendance: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);