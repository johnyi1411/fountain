/* eslint-disable react/forbid-prop-types */
import React from 'react';
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
      jobs: [
        {
          id: 1,
          employer: 'brian',
          title: 'software engineer',
          description: 'with react',
        },
        {
          id: 2,
          employer: 'brian',
          title: 'software engineering intern experience',
          description: 'with 6 years',
        },
      ],
    };

    this.goBack = this.goBack.bind(this);
    this.handleNewJob = this.handleNewJob.bind(this);
  }

  goBack() {
    const { history, handleUserChange } = this.props;
    handleUserChange(null, null);
    history.goBack();
  }

  handleNewJob(title, description, id) {
    console.log(title, description, id);
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
                <NewJobForm handleNewJob={this.handleNewJob} id={id} />
                {jobs.map((job) => (
                  <div key={job.id} className="employer-jobs">
                    <Link to={`/employer/${job.employer}/job/${job.id}`}>{job.id}</Link>
                    <p>{`employer: ${job.employer}`}</p>
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
  history: PropTypes.object.isRequired,
  user: PropTypes.string,
  id: PropTypes.number,
  handleUserChange: PropTypes.func.isRequired,
};

EmployerPage.defaultProps = {
  user: null,
  id: null,
};

export default EmployerPage;
