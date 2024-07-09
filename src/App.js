import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import CheckboxList from './components/CheckboxList';
import themes from './themes'; 
import './App.css';

function App({ t }) {
  const [isToggled, setIsToggled] = useState(false);
  const [theme, setTheme] = useState('default');

  const handleToggle = (toggled) => {
    setIsToggled(toggled);
  };

  useEffect(() => {
    const themeVariables = themes[theme];
    for (const [key, value] of Object.entries(themeVariables)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <Sidebar onToggle={handleToggle} onThemeChange={handleThemeChange} /> {}
        <div className="content-area">
          <MainContent isToggled={isToggled} />
          <CheckboxList isGeneratorActive={isToggled} />
        </div>
      </div>
    </div>
  );
}

export default withTranslation()(App);
