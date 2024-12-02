const Employee = require('../models/employeeModel');

const createEmployee = async (req, res) => {
  const { name, department, position } = req.body;

  try {
    const newEmployee = new Employee({ name, department, position });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
};


const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};

// Get Employee by ID (GET /employees/:id)
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};

// Update Employee (PUT /employees/:id)
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, department, position } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, department, position }, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};


const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};


const searchEmployees = async (req, res) => {
  const { department, position } = req.query;

  try {
    const query = {};
    if (department) query.department = department;
    if (position) query.position = position;

    const employees = await Employee.find(query);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error searching employees', error });
  }
};

module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, searchEmployees };