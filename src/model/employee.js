const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: String, required: true },
    joiningDate: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Employee",employeeSchema);