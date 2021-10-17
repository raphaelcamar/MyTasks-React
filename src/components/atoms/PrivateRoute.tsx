import React, { Component, ReactElement } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { useProfile } from '../../contexts/UserContext';

type privateRouteProps = {
  component: Component,
  rest: RouteComponentProps
}

export default function PrivateRoute({ component, ...rest }: privateRouteProps): ReactElement {
  const { isAuth } = useProfile();

  return (
    <Route
      {...rest}
      render={(props) => (isAuth ? (
        <Component {...props} />
      ) : (
        // eslint-disable-next-line react/prop-types
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ))}
    />
  );
}
