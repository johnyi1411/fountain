/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import axios from 'axios';
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

  componentDidMount() {
    axios.get('/user').then((response) => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data) {
        console.log('Get User: There is a user saved in the server session: ');
        this.setState({
          user: response.data.user.email,
          id: response.data.user.employer_id || response.data.user.applicant_id,
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          user: null,
          id: null,
        });
      }
    });
  }

  handleUserChange(user, id) {
    this.setState({ user, id });
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
          <PrivateRoute path="/employer" user={user} id={id} handleUserChange={this.handleUserChange} component={EmployerPage} />
          <PrivateRoute path="/applicant" user={user} id={id} handleUserChange={this.handleUserChange} component={ApplicantPage} />
        </div>
      </Router>
    );
  }
}

export default App;
