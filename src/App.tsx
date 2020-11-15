import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import './assets/index.css'
import RouterView from './routes'
import { useNotification } from './utils/hooks'

function App() {
  useNotification()

  return (
    <div className="App">
      <RouterView />
    </div>
  )
}

export default App
