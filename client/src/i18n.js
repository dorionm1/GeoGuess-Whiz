import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './language-text/en.json';
import frTranslations from './language-text/fr.json';

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'en', // default language
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
  },
});

export default i18n;