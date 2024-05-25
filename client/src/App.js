import React, { useState, useEffect } from 'react';
import NavBar from './components/common/NavBar';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import HomeAllFlags from './components/home-page/HomeAllFlags';
import FlagGuessForm from './components/flag-guesser-game/FlagGuessForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/sign-in-forms/SignUpForm';
import LogInForm from './components/sign-in-forms/LoginForm';
import UserScores from './components/flag-guesser-game/Scores';

const App = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const changeLanguage = (lng) => {
    setLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <NavBar changeLanguage={changeLanguage} />
      <Router>
        <Routes>
          <Route path="/" element={<HomeAllFlags />} />
          <Route path="/flag-game" element={<FlagGuessForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/log-in" element={<LogInForm />} />
          <Route path="/scores" element={<UserScores />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
};

export default App;