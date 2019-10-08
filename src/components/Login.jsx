/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import EmployerLogin from './EmployerLogin';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
    };

    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect() {
    const { redirectToReferrer } = this.state;
    this.setState({ redirectToReferrer: !redirectToReferrer });
  }

  render() {
    const { location, handleUserChange } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        {from.pathname === '/employer' ? <EmployerLogin handleRedirect={this.handleRedirect} handleUserChange={handleUserChange} /> : <div>nothing</div>}
      </div>
    );
  }
}

Login.propTypes = {
  handleUserChange: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default Login;
