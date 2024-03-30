import NavBar from './components/NavBar';
import { I18nextProvider } from 'react-i18next'; 
import i18n from 'i18next';
import enTranslations from './language-text/en.json';
import frTranslations from './language-text/fr.json';
import HomeAllFlags from './components/homePage/HomeAllFlags';
import FlagGuessForm from './components/flagGuesser/FlagGuessForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

i18n.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
  },
});
 
const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <NavBar></NavBar>
      <Router>
        <Routes>
          <Route path="/" element={<HomeAllFlags />}></Route>
          <Route path="/flag-game" element={<FlagGuessForm />}></Route>
        </Routes>
      </Router>
    </I18nextProvider>
  )
}

export default App;