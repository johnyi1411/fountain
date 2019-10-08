import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class EmployerLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      company: null,
      signUpView: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
    this.handleSignUpView = this.handleSignUpView.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleCompanyChange(e) {
    this.setState({ company: e.target.value });
  }

  handleSignUpView() {
    const { signUpView } = this.state;
    this.setState({ signUpView: !signUpView });
  }

  handleLoginFormSubmit(e) {
    e.preventDefault();
    const {
      email, password, company, signUpView,
    } = this.state;

    if (signUpView) {
      this.handleSignUp(email, password, company);
    } else {
      this.handleLogin(email, password);
    }
  }

  handleLogin(email, password) {
    const { handleUserChange } = this.props;

    axios.post('/employer/login', { email, password, userType: 'employer' })
      .then((response) => {
        if (response.status === 200) {
          handleUserChange(response.data.email, response.data.employer_id, true);
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

  handleSignUp(email, password, company) {
    const { handleRedirect } = this.props;

    axios.post('/employer/signup', {
      email,
      password,
      company,
    })
      .then((response) => {
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
        <h1>Employer</h1>
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
          <label htmlFor="company">
            Company:
            <input type="text" onChange={this.handleCompanyChange} />
          </label>
          )}
          <input type="submit" value="submit" />
        </form>
        <button type="button" onClick={this.handleSignUpView}>{signUpView ? 'Login' : 'Sign Up'}</button>
      </div>
    );
  }
}

EmployerLogin.propTypes = {
  handleUserChange: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
};

export default EmployerLogin;
