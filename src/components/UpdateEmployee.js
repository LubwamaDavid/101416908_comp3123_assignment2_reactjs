import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';

function UpdateEmployee() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get(`/employees/${id}`)
      .then((response) => {
        const { name, department, position } = response.data;
        setName(name);
        setDepartment(department);
        setPosition(position);
      })
      .catch((error) => console.error('Error fetching employee:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.put(`/employees/${id}`, { name, department, position })
      .then(() => navigate('/employees'))
      .catch((error) => console.error('Error updating employee:', error));
  };

  return (
    <div className="container">
      <h1>Update Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Update Employee</button>
      </form>
    </div>
  );
}

export default UpdateEmployee;
