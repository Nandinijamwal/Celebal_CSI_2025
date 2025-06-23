import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
  <div className="theme-toggle-switch">
    <span className="theme-label">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
    <label className="switch">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === 'dark'}
      />
      <span className="slider round"></span>
    </label>
  </div>
);
};

export default ThemeToggle;
