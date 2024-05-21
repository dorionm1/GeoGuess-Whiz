import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import HomeAllFlags from './components/HomePage/HomeAllFlags';
import FlagGuessForm from './components/FlagGuesser/FlagGuessForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignInForms/SignUpForm';
import LogInForm from './components/SignInForms/LoginForm';
import UserScores from './components/Scores';

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