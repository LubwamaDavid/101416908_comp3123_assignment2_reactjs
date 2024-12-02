import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

function AddEmployee() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.post('/employees', { name, department, position })
      .then(() => navigate('/employees'))
      .catch((error) => console.error('Error adding employee:', error));
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Department</label>
          <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Position</label>
          <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
