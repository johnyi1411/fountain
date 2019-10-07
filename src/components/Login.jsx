/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      redirectToReferrer: false,
      signUpView: false,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignUpView = this.handleSignUpView.bind(this);
    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSignUpView() {
    const { signUpView } = this.state;
    this.setState({ signUpView: !signUpView });
  }

  handleLoginFormSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { handleUserChange } = this.props;
    handleUserChange(username, 1);
    this.setState({ redirectToReferrer: true });
  }

  // TO DO
  handleLogin() {
    console.log('hello');
  }

  // TO DO
  handleSignUp(username, password) {
    axios.post('/users', {
      username,
      password,
    })
      .then((response) => {
        console.log(response);
        if (response.data) {
          console.log('successful sign up');
          // send user back to employer or applicant page after sign up.
          this.setState({ redirectToReferrer: true });
        } else {
          console.log('Sign up error');
        }
      })
      .catch((error) => {
        console.log('sign up server error: ');
        console.log(error);
      });
  }

  render() {
    const { location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, signUpView } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <h1>{signUpView ? 'Sign Up' : 'Login'}</h1>
        <form onSubmit={this.handleLoginFormSubmit}>
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
        <button type="button" onClick={this.handleSignUpView}>{signUpView ? 'Login' : 'Sign Up'}</button>
      </div>
    );
  }
}

Login.propTypes = {
  handleUserChange: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default Login;
