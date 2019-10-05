import React from 'react';
import {
  BrowserRouter as Router, Route, Link,
} from 'react-router-dom';
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
          employer: 'jian',
          title: 'software engineering intern experience',
          description: 'with 6 years',
        },
      ],
    };
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
                    <Link to={`/job/${job.id}`}>{job.id}</Link>
                    <p>{`employer: ${job.employer}`}</p>
                    <p>{`title: ${job.title}`}</p>
                    <p>{`description: ${job.description}`}</p>
                  </div>
                ))}
              </div>
            )}
          />
          <Route path="/job/:id" component={EmployerJob} />
        </div>
      </Router>
    );
  }
}

export default EmployerPage;
