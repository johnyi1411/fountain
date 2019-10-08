/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ApplicantPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [
        {
          job_id: 1,
          employer: 'brian',
          title: 'software engineer',
          description: 'with react',
        },
        {
          job_id: 2,
          employer: 'brian',
          title: 'software engineering intern experience',
          description: 'with 6 years',
        },
      ],
      applications: { 1: true },
    };

    this.goBack = this.goBack.bind(this);
    this.handleApply = this.handleApply.bind(this);
  }

  componentDidMount() {
    axios.get('/job')
      .then((results) => this.setState({ jobs: results.data }))
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

  handleApply(id) {
    const { applications } = this.state;
    this.setState({ applications: { ...applications, [id]: true } });
  }

  render() {
    const { jobs, applications } = this.state;

    return (
      <div>
        <h1>Jobs</h1>
        {jobs.map((job) => (
          <div key={job.job_id} className="applicant-jobs">
            <p>{job.job_id}</p>
            <p>{`Employer: ${job.company}`}</p>
            <p>{`Title: ${job.title}`}</p>
            <p>{`Description: ${job.description}`}</p>
            {applications[job.job_id] ? <p>Applied</p> : <button className="apply-button" type="button" onClick={() => this.handleApply(job.job_id)}>Apply</button>}
          </div>
        ))}
        <button id="logout-button" type="button" onClick={this.goBack}>Logout</button>
      </div>
    );
  }
}

ApplicantPage.propTypes = {
  handleUserChange: PropTypes.func.isRequired,
};

export default ApplicantPage;
