import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { userAuth } = useSelector((state) => state.userLogin)

  return (
    <Route
      {...rest}
      render={(props) => {
        return userAuth ? <Component {...props} /> : <Redirect to='/login' />
      }}
    ></Route>
  )
}
