import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Charts from './pages/Charts';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/charts">Charts</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/kanban">Kanban</Link></li>
          </ul>
          <ThemeToggle />
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/kanban" element={<Kanban />} />
          </Routes>
        </main>
      </div>
    </Router>
    
  );
}

export default App;
