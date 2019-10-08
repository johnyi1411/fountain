/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import EmployerLogin from './EmployerLogin';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      company: null,
      redirectToReferrer: false,
      signUpView: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleSignUpView = this.handleSignUpView.bind(this);
    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
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
    const { handleUserChange } = this.props;

    if (signUpView) {
      this.handleSignUp(email, password, company);
    } else {
      handleUserChange(email, 1);
      this.setState({ redirectToReferrer: true });
    }
  }

  handleRedirect() {
    const { redirectToReferrer } = this.state;
    this.setState({ redirectToReferrer: !redirectToReferrer });
  }

  // TO DO
  handleLogin() {
    console.log('hello');
  }

  // TO DO
  handleSignUp(email, password, company) {
    const { handleUserChange } = this.props;

    axios.post('/employer', {
      email,
      password,
      company,
    })
      .then((response) => {
        console.log(response);
        if (response.data) {
          console.log('successful sign up');
          // send user back to employer or applicant page after sign up.
          handleUserChange(email, 1);
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
