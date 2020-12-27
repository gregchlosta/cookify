import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <PrivateRoute path='/profile' component={ProfileScreen} />
      </Switch>
    </Router>
  )
}
