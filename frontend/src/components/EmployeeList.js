import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    apiClient.get('/employees')
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  const deleteEmployee = (id) => {
    apiClient.delete(`/employees/${id}`)
      .then(() => setEmployees(employees.filter((emp) => emp._id !== id)))
      .catch((error) => console.error('Error deleting employee:', error));
  };

  return (
    <div className="container">
      <h1>Employee List</h1>
      <Link to="/add-employee" className="btn btn-primary mb-3">Add Employee</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>
                <Link to={`/update-employee/${emp._id}`} className="btn btn-warning me-2">Edit</Link>
                <button onClick={() => deleteEmployee(emp._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
