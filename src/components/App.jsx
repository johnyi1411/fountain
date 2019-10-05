/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router, Route, Link,
} from 'react-router-dom';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import EmployerPage from './EmployerPage';
import ApplicantPage from './ApplicantPage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      id: null,
    };
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(user) {
    this.setState({ user, id: 1 });
  }

  render() {
    const { user, id } = this.state;

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
          <PrivateRoute path="/employer" user={user} id={id} component={EmployerPage} />
          <PrivateRoute path="/applicant" user={user} id={id} component={ApplicantPage} />
        </div>
      </Router>
    );
  }
}

export default App;
