/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      redirectToReferrer: false,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to={from} />;

    const { username, password } = this.state;
    const { handleUserChange } = this.props;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        handleUserChange(username, 1);
        this.setState({ redirectToReferrer: true });
      }}
      >
        <label htmlFor="username">
          Username:
          <input type="text" onChange={this.handleUsernameChange} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" onChange={this.handlePasswordChange} />
        </label>
        <input type="submit" value="submit" />
      </form>
    );
  }
}

Login.propTypes = {
  handleUserChange: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default Login;
