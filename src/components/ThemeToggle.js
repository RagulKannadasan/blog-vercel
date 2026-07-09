'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) {
    return (
      <button className="theme-toggle" aria-label="Toggle Theme">
        <span>🌙</span>
      </button>
    );
  }

  return (
    <button id="theme-toggle" className="theme-toggle" aria-label="Toggle Theme" onClick={toggleTheme}>
      <span id="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
    </button>
  );
}
