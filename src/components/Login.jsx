import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
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
    const { username, password } = this.state;
    const { handleUserChange } = this.props;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        handleUserChange(username, password);
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
};

export default Login;
