import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import './i18n'

import store from './store'
import App from './App'

import { firebaseConfig } from './utils/constants'
firebase.initializeApp(firebaseConfig)

let appInit = false
firebase.auth().onAuthStateChanged(() => {
  if (!appInit) {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <StoreProvider store={store}>
            <App />
          </StoreProvider>
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root')
    )
    appInit = true
  }
})
