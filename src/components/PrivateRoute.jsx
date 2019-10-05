/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  user, id, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (user ? (
      <Component {...props} user={user} id={id} />
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
