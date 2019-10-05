import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (user ? (
      <h1>logged in</h1>
      // <Redirect
      //   to={{
      //     pathname: '/employers',
      //     // state: { from: props.location },
      //   }}
      // />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    ))}
  />
);

export default PrivateRoute;
