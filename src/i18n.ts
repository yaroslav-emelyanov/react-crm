import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import english from './locales/en-US.json'
import russian from './locales/ru-RU.json'

export enum Language {
  english = 'en-US',
  russian = 'ru-RU',
}

i18n.use(initReactI18next).init({
  resources: {
    [Language.english]: {
      translation: english,
    },
    [Language.russian]: {
      translation: russian,
    },
  },
  lng: localStorage.getItem('lang') || Language.russian,
  fallbackLng: Language.russian,
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV === 'development',
})

export default i18n
