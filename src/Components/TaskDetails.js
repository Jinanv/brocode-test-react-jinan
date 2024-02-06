import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskDetails = ({ taskId, onBack }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  return (
    <div>
      {task ? (
        <div class="task-details-container">
          <h2>Task Details</h2>
          <p>Title: {task.title}</p>
          <p>User: {task.userId}</p>
          <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
          <button onClick={onBack}>Back to Task List</button>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};

export default TaskDetails;
