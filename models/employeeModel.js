const mongoose = require('mongoose');

const employeeSchema = require('../schemas/employeeSchema')

module.exports = mongoose.model('Employee', employeeSchema);