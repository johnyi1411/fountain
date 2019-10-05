import React from 'react';
import Login from './Login';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      user: null,
    };
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(user) {
    this.setState({ user: user || null });
  }

  render() {
    const { user } = this.state;
    const login = user ? <button type="submit" onClick={this.handleUserChange}>Logout</button> : <Login handleUserChange={this.handleUserChange} />;
    return (
      <div>
        {login}
      </div>
    );
  }
}

export default App;
