import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'
import routes from './routes'

const RouterView = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route {...route} key={route.path} />
      ))}
    </Switch>
  )
}

export default RouterView
