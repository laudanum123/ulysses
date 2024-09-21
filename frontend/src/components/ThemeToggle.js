// src/components/ThemeToggle.js

import React from 'react';
import '../styles/ThemeToggle.css';

function ThemeToggle({ toggleTheme, currentTheme }) {
  return (
    <button className="theme-toggle-button" onClick={toggleTheme}>
      Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

export default ThemeToggle;
