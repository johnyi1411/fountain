/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ user, ...rest }) => (
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

PrivateRoute.propTypes = {
  user: PropTypes.string,
};

PrivateRoute.defaultProps = {
  user: null,
};

export default PrivateRoute;
