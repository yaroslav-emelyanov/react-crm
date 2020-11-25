import { Rate } from './enums'

export const messages: { [key: string]: string } = {
  logout: 'Вы вышли из системы',
  'auth/user-not-found': 'Пользователь не найден',
  defaultError: 'Что то пошло не так...',
  'auth/wrong-password': 'Неверный пароль',
  'auth/email-already-in-use': 'Данный email уже используется',
}

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

export const currencies: Rate[] = [Rate.RUB, Rate.USD, Rate.EUR]
