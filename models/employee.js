const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    employeeId : String,
    employeeName : String,
    job : String,
    salary : Number,
    image: { type: String, default: '/images/manager.png' }
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;