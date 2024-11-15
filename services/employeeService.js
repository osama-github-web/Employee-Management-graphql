const employeeModel = require('../models/employeeModel');

// Function to add a new employee
async function addEmployee(emp) {
    try {
        const employee = new employeeModel(emp); // Create a new employee document
        const savedEmployee = await employee.save(); // Save the document to the database
        return savedEmployee; // Return the saved employee document
    } catch (error) {
        throw new Error('Error adding employee: ' + error.message);
    }
}

// Function to update an existing employee
async function updateEmployee(emp) {
    try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(emp.id, emp, {
            new: true, // Return the updated document
            runValidators: true, // Validate the update against the model schema
        });
        
        if (!updatedEmployee) {
            throw new Error('Employee not found');
        }
        
        return updatedEmployee; // Return the updated employee document
    } catch (error) {
        throw new Error('Error updating employee: ' + error.message);
    }
}

// Function to delete an employee
async function deleteEmployee(id) {
    try {
        const employee = await employeeModel.findByIdAndDelete(id);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee; // Return the deleted employee document (if needed)
    } catch (error) {
        throw new Error('Error deleting employee: ' + error.message);
    }
}

// Function to get all employees
async function getAllEmployees() {
    try {
        const employees = await employeeModel.find(); // Fetch all employees
        return employees; // Return the list of employees
    } catch (error) {
        throw new Error('Error fetching employees: ' + error.message);
    }
}

// Function to get an employee by ID
async function getEmployee(id) {
    try {
        const employee = await employeeModel.findById(id); // Fetch employee by ID
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee; // Return the found employee
    } catch (error) {
        throw new Error('Error fetching employee: ' + error.message);
    }
}

// Exporting the functions
module.exports = { addEmployee, getAllEmployees, getEmployee, deleteEmployee, updateEmployee };