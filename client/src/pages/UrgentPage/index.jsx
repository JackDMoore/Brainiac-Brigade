import React from 'react';
import TodoPage from '../TodoPage';
import './urgent.css';

const UrgentPage = ({ tasks, onAddTask, onDeleteTask, onUpdateTask }) => {
    const filterTasksByWeek = () => {
        const currentDate = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(currentDate.getDate() + 7);
      
        return tasks.filter((task) => {
          const dueDate = new Date(task.date);
          const daysRemaining = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));
          return daysRemaining >= -7;
        });
      };

  const getDaysRemaining = (dueDate) => {
    const oneDay = 24 * 60 * 60 * 1000; 
    const currentDate = new Date();
    const diffDays = Math.round((dueDate - currentDate) / oneDay);
    return diffDays;
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    onDeleteTask(updatedTasks);
  };
  
  const handleUpdateTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, task: updatedTask };
      }
      return task;
    });
    onUpdateTask(updatedTasks);
  };

  return (
    <div className="urgent-page" data-testid="urgent-page">
      <h1>Urgent Tasks</h1>
      <div className="side-menu">
        <h3>Color Codes</h3>
        <ul>
          <li>
            <span className="color-box yellow"></span>
            <span>7 or more days remaining</span>
          </li>
          <li>
            <span className="color-box orange"></span>
            <span>3 to 6 days remaining</span>
          </li>
          <li>
            <span className="color-box red"></span>
            <span>Less than 3 days remaining</span>
          </li>
        </ul>
      </div>
      <div className="task-list" data-testid="task-list">
        {filterTasksByWeek().map((task) => {
          const dueDate = new Date(task.date);
          const daysRemaining = getDaysRemaining(dueDate);

          let taskColor = '';
          if (daysRemaining >= 7) {
            taskColor = 'yellow';
          } else if (daysRemaining >= 3) {
            taskColor = 'orange';
          } else {
            taskColor = 'red';
          }

          return (
            <div key={task.id} className={`task ${taskColor}`}>
              <h2>{task.task}</h2>
              <p>Due Date: {dueDate.toDateString()}</p>
              <p>Days Remaining: {daysRemaining}</p>
              <input
                type="text"
                value={task.task}
                onChange={(e) => handleUpdateTask(task.id, e.target.value)}
              />
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          );
        })}
      </div>

      <TodoPage tasks={tasks} onAddTask={onAddTask} />
    </div>
  );
};

export default UrgentPage;
