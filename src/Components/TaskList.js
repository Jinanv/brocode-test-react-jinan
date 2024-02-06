import React, { useState } from 'react';
import TaskDetails from './TaskDetails';

const TaskList = () => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
  };

  const handleBackToList = () => {
    setSelectedTaskId(null);
  };

  return (
    <div>
      {selectedTaskId ? (
        <TaskDetails taskId={selectedTaskId} onBack={handleBackToList} />
      ) : (
        <div class="task-list-container">
          {/* Render your task list here */}
          <p>Task list goes here</p>
          {/* Example task item with click handler */}
          <div onClick={() => handleTaskClick(1)}>Task 1</div>
          <div onClick={() => handleTaskClick(2)}>Task 2</div>
          {/* Add more task items as needed */}
        </div>
      )}
    </div>
  );
};

export default TaskList;
