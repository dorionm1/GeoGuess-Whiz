import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar';
import { I18nextProvider } from 'react-i18next'; 
import i18n from 'i18next';
import enTranslations from './languages/en.json';
import frTranslations from './languages/fr.json';

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

  const [backendData, setBackendData] = useState([{}]);
  
  useEffect(() => {
    fetch("/rand-country-flags").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <NavBar></NavBar>
    </I18nextProvider>
  )
}

export default App;