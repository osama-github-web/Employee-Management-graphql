const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  subjects: [String],
  attendance: { type: Number, default: 0 },
  role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
  password: { type: String, required: true },
});

module.exports = EmployeeSchema;