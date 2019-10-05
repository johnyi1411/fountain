import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import Login from './Login';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      user: null,
      employer: false,
    };
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const login = user ? (
      <button
        type="submit"
        onClick={() => {
          this.handleUserChange(null);
        }}
      >
      Logout
      </button>
    ) : <Login handleUserChange={this.handleUserChange} />;
    return (
      <div>
        {login}
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>
            <Route exact path="/" render={() => <h1>just /</h1>} />
            <Route path="/about" render={() => <h1>about</h1>} />
            <Route path="/topics" render={() => <h1>topics</h1>} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
