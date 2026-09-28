const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
 .connect(process.env.MONGO_URI, {
  family: 4,
})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

app.get("/", (req, res) => {
  res.json({
    message: "AI Student Information System Backend is running",
  });
});
// GET ALL STUDENTS
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
});
// ADD STUDENT
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add student",
      error: error.message,
    });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});