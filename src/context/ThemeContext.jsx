import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Force dark mode initially for the premium look
    const savedTheme = localStorage.getItem('freevault-theme');
    return savedTheme ? savedTheme : 'dark';
  });

  // Force dark mode on first load if user had light mode previously saved from old version
  useEffect(() => {
    if (localStorage.getItem('freevault-theme') === 'light' && !localStorage.getItem('freevault-dark-forced')) {
      setTheme('dark');
      localStorage.setItem('freevault-dark-forced', 'true');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('freevault-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
