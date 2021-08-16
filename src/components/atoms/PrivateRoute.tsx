import React, {Component} from 'react'
import { Redirect, Route } from 'react-router'
import { useProfile } from '../../contexts/UserContext'

export default function PrivateRoute({component: Component, ...rest}) {
  const { isAuth } = useProfile();

  console.log(isAuth)
  return (
    <Route
      {...rest}
      render={props => isAuth ? (
          <Component {...props}/>
        ): (
          <Redirect to={{pathname: '/', state: {from: props.location}}} />
        )}
    >
      
    </Route>
  )
}
