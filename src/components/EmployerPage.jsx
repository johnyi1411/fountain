/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  BrowserRouter as Router, Route, Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import EmployerJob from './EmployerJob';

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
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { jobs } = this.state;

    return (
      <Router>
        <div>
          <Route
            exact
            path="/employer"
            render={() => (
              <div>
                {jobs.map((job) => (
                  <div key={job.id} className="employer-jobs">
                    <Link to={`/employer/${job.employer}/job/${job.id}`}>{job.id}</Link>
                    <p>{`employer: ${job.employer}`}</p>
                    <p>{`title: ${job.title}`}</p>
                    <p>{`description: ${job.description}`}</p>
                  </div>
                ))}
                <button type="button" onClick={this.goBack}>Go Back</button>
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
};

export default EmployerPage;
