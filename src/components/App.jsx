import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

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
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/employer">Employers</Link>
            </li>
            <li>
              <Link to="/applicant">Applicants</Link>
            </li>
          </ul>
          {/* <Route path="/employer" render={() => <h1>Employers</h1>} />
          <Route path="/applicant" render={() => <h1>Applicants</h1>} /> */}
          <Route path="/login" render={(props) => <Login {...props} handleUserChange={this.handleUserChange} />} />
          <PrivateRoute path="/employer" user={user} />
        </div>
      </Router>
    );
  }
}

export default App;
