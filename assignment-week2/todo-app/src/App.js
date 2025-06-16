import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('none');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (!input.trim()) return alert('Task cannot be empty!');
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const applyFilter = (list) => {
    return list.filter(task =>
      filter === 'all'
        ? true
        : filter === 'completed'
        ? task.completed
        : !task.completed
    );
  };

  const applySort = (list) => {
    const sorted = [...list];
    if (sort === 'az') {
      return sorted.sort((a, b) => a.text.localeCompare(b.text));
    } else if (sort === 'za') {
      return sorted.sort((a, b) => b.text.localeCompare(a.text));
    } else if (sort === 'status') {
      return sorted.sort((a, b) => a.completed - b.completed); // pending first
    }
    return sorted;
  };

  const finalTasks = applySort(applyFilter(tasks));

  return (
    <div className="app">
      <h1>📓 My Notebook To-Do List</h1>

      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a new task..."
        />
        <button onClick={handleAdd}>➕ Add</button>
      </div>

      <div className="control-bar">
        <div className="filter-group">
          <span>Filter:</span>
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
          <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pending</button>
        </div>

        <div className="sort-group">
          <span>Sort:</span>
          <button onClick={() => setSort('none')} className={sort === 'none' ? 'active' : ''}>None</button>
          <button onClick={() => setSort('az')} className={sort === 'az' ? 'active' : ''}>A-Z</button>
          <button onClick={() => setSort('za')} className={sort === 'za' ? 'active' : ''}>Z-A</button>
          <button onClick={() => setSort('status')} className={sort === 'status' ? 'active' : ''}>Pending First</button>
        </div>
      </div>

      <ul className="task-list">
        {finalTasks.map(task => (
          <li key={task.id} className={task.completed ? 'done' : ''}>
            <span onClick={() => toggleComplete(task.id)}>
              {task.completed ? '✅ ' : '⬜ '} {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>🗑</button>
          </li>
        ))}
        {finalTasks.length === 0 && <p className="empty">No tasks to show ✨</p>}
      </ul>
    </div>
  );
}

export default App;
