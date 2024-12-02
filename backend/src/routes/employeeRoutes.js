const express = require('express');
const router = express.Router();
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, searchEmployees } = require('../controllers/employeeController');

router.post('/employees', createEmployee);

router.get('/employees', getEmployees);

router.get('/employees/:id', getEmployeeById);

router.put('/employees/:id', updateEmployee);

router.delete('/employees/:id', deleteEmployee);

router.get('/employees/search', searchEmployees);

module.exports = router;
