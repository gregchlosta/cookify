import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ItemAddScreen from './screens/ItemAddScreen'
import ItemDetailsScreen from './screens/ItemDetailsScreen'
import MyItemsScreen from './screens/MyItemsScreen'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/login' component={LoginScreen} />
        <Route path='/reset' component={ResetPasswordScreen} />
        <Route path='/register' component={RegisterScreen} />
        <PrivateRoute path='/profile' component={ProfileScreen} />
        <PrivateRoute path='/add' component={ItemAddScreen} />
        <PrivateRoute path='/edit/:id' component={ItemAddScreen} />
        <Route path='/item/:id' component={ItemDetailsScreen} />
        <PrivateRoute path='/my' component={MyItemsScreen} />
        <PrivateRoute path='/favorite' component={HomeScreen} />
      </Switch>
    </Router>
  )
}
