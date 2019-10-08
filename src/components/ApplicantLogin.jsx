import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class ApplicantLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      signUpView: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
    this.handleSignUpView = this.handleSignUpView.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleSignUpView() {
    const { signUpView } = this.state;
    this.setState({ signUpView: !signUpView });
  }

  handleLoginFormSubmit(e) {
    e.preventDefault();
    const {
      email, password, firstName, lastName, signUpView,
    } = this.state;

    if (signUpView) {
      this.handleSignUp(email, password, firstName, lastName);
    } else {
      this.handleLogin(email, password);
    }
  }

  handleLogin(email, password) {
    const { handleUserChange } = this.props;

    axios.post('/applicant/login', { email, password })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          handleUserChange(response.data.email, response.data.applicant_id, false);
        } else {
          console.log('log in error');
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('wrong username or password');
        } else {
          console.log('loginserver error: ');
          console.log(error);
        }
      });
  }

  handleSignUp(email, password, firstName, lastName) {
    const { handleRedirect } = this.props;

    axios.post('/applicant/signup', {
      email,
      password,
      firstName,
      lastName,
    })
      .then((response) => {
        console.log(response);
        if (response.data) {
          console.log('successful sign up');
          // send user back to login page after sign up.
          handleRedirect();
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
    const { signUpView } = this.state;

    return (
      <div>
        <h1>Applicant</h1>
        <h2>{signUpView ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={this.handleLoginFormSubmit}>
          <label htmlFor="email">
            Email:
            <input type="text" onChange={this.handleEmailChange} />
          </label>
          <label htmlFor="password">
            Password:
            <input type="password" onChange={this.handlePasswordChange} />
          </label>
          {signUpView && (
          <label htmlFor="firstName">
            First Name:
            <input type="text" onChange={this.handleFirstNameChange} />
          </label>
          )}
          {signUpView && (
          <label htmlFor="lastName">
            Last Name:
            <input type="text" onChange={this.handleLastNameChange} />
          </label>
          )}
          <input type="submit" value="submit" />
        </form>
        <button type="button" onClick={this.handleSignUpView}>{signUpView ? 'Login' : 'Sign Up'}</button>
      </div>
    );
  }
}

ApplicantLogin.propTypes = {
  handleUserChange: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
};

export default ApplicantLogin;
