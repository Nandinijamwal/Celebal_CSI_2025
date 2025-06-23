import React, { useState } from 'react';
import './Kanban.css';

const initialTasks = {
  todo: ['Task 1', 'Task 2'],
  doing: ['Task 3'],
  done: ['Task 4']
};

const Kanban = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const handleDrop = (e, category) => {
    const task = e.dataTransfer.getData('text');
    const newTasks = { ...tasks };

    for (let cat in newTasks) {
      newTasks[cat] = newTasks[cat].filter(t => t !== task);
    }
    newTasks[category].push(task);
    setTasks(newTasks);
  };

  const handleDrag = (e, task) => {
    e.dataTransfer.setData('text', task);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks({ ...tasks, todo: [...tasks.todo, newTask] });
      setNewTask('');
    }
  };

  return (
    <div className="kanban-wrapper">
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="kanban">
        {Object.keys(tasks).map(category => (
          <div
            key={category}
            className="column"
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, category)}
          >
            <h3>{category.toUpperCase()}</h3>
            {tasks[category].map(task => (
              <div
                key={task}
                className="task"
                draggable
                onDragStart={e => handleDrag(e, task)}
              >
                {task}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;