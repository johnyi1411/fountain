/* eslint-disable react/forbid-prop-types */
import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router, Route, Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import EmployerJob from './EmployerJob';
import NewJobForm from './NewJobForm';

class EmployerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    };

    this.goBack = this.goBack.bind(this);
    this.getEmployerJobs = this.getEmployerJobs.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    this.getEmployerJobs(id);
  }

  getEmployerJobs(id) {
    axios.get(`/employer/${id}/job`)
      .then(({ data }) => this.setState({ jobs: data }))
      .catch((error) => console.log('error getting jobs', error));
  }

  goBack() {
    const { handleUserChange } = this.props;

    axios.post('/logout')
      .then((result) => {
        if (result.data.msg === 'logging out') {
          handleUserChange(null, null, false);
        }
      })
      .catch((error) => {
        console.log('error logging out');
        console.log(error.response);
      });
  }

  render() {
    const { jobs } = this.state;
    const { user, id } = this.props;

    return (
      <Router>
        <div>
          <Route
            exact
            path="/employer"
            render={() => (
              <div>
                <NewJobForm getEmployerJobs={this.getEmployerJobs} id={id} user={user} />
                {jobs.map((job) => (
                  <div key={job.job_id} className="employer-jobs">
                    <Link to={`/employer/${job.company}/job/${job.job_id}`}>{job.job_id}</Link>
                    <p>{`employer: ${job.company}`}</p>
                    <p>{`title: ${job.title}`}</p>
                    <p>{`description: ${job.description}`}</p>
                  </div>
                ))}
                <button type="button" onClick={this.goBack}>Logout</button>
              </div>
            )}
          />
          <Route path="/employer/:employer/job/:id" component={EmployerJob} />
        </div>
      </Router>
    );
  }
}

EmployerPage.propTypes = {
  user: PropTypes.string,
  id: PropTypes.number,
  handleUserChange: PropTypes.func.isRequired,
};

EmployerPage.defaultProps = {
  user: null,
  id: null,
};

export default EmployerPage;
