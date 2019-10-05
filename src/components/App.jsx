/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router, Route, Link,
} from 'react-router-dom';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <ul>
                <li>
                  <Link to="/employer">Employers</Link>
                </li>
                <li>
                  <Link to="/applicant">Applicants</Link>
                </li>
              </ul>
            )}
          />
          <Route path="/login" render={(props) => <Login {...props} handleUserChange={this.handleUserChange} />} />
          <PrivateRoute path="/employer" user={user} />
          <PrivateRoute path="/applicant" user={user} />
        </div>
      </Router>
    );
  }
}

export default App;
