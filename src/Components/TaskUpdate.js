import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskUpdate = ({ taskId }) => {
  const [formData, setFormData] = useState({
    title: '',
    userId: '',
    completed: false
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
        const taskData = response.data;
        setFormData({
          title: taskData.title,
          userId: taskData.userId.toString(),
          completed: taskData.completed
        });
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form fields
      const validationErrors = {};
      if (!formData.title.trim()) {
        validationErrors.title = 'Title is required';
      }
      if (!formData.userId.trim()) {
        validationErrors.userId = 'User ID is required';
      } else if (isNaN(formData.userId) || formData.userId < 1 || formData.userId > 10) {
        validationErrors.userId = 'User ID must be a number between 1 and 10';
      }
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        // Submit form data
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${taskId}`, formData);
        console.log('Task updated:', response.data);
        setSuccessMessage('Task updated successfully!');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div class="task-update-container">
      <h2>Update Task</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} />
          {errors.userId && <p style={{ color: 'red' }}>{errors.userId}</p>}
        </div>
        <div>
          <label htmlFor="completed">Completed:</label>
          <input type="checkbox" id="completed" name="completed" checked={formData.completed} onChange={handleChange} />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default TaskUpdate;
