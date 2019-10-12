/* eslint-disable no-return-assign */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ApplicantPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      applications: {},
    };

    this.goBack = this.goBack.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.getApplicantApplications = this.getApplicantApplications.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    axios.get('/job')
      .then((results) => this.setState({ jobs: results.data }))
      .then(() => this.getApplicantApplications(id))
      .catch((error) => console.log('error getting jobs', error));
  }

  getApplicantApplications(applicantId) {
    axios.get(`/applicant/${applicantId}/application`)
      .then((results) => {
        const applications = {};
        results.data.forEach((application) => applications[application.job_id] = true);
        this.setState({ applications });
      })
      .catch((error) => console.log('error getting applications', error));
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

  handleApply(applicantId, jobId) {
    axios.post('/application', {
      applicantId,
      jobId,
    })
      .then(() => {
        this.getApplicantApplications(applicantId);
      })
      .catch((error) => console.log('error applying', error));
  }

  render() {
    const { jobs, applications } = this.state;
    const { id } = this.props;

    return (
      <div>
        <h1>Jobs</h1>
        {jobs.map((job) => (
          <div key={job.job_id} className="applicant-jobs">
            <p>{job.job_id}</p>
            <p>{`Employer: ${job.company}`}</p>
            <p>{`Title: ${job.title}`}</p>
            <p>{`Description: ${job.description}`}</p>
            {applications[job.job_id] ? <p>Applied</p> : <button className="apply-button" type="button" onClick={() => this.handleApply(id, job.job_id)}>Apply</button>}
          </div>
        ))}
        <button id="logout-button" type="button" onClick={this.goBack}>Logout</button>
      </div>
    );
  }
}

ApplicantPage.propTypes = {
  handleUserChange: PropTypes.func.isRequired,
  id: PropTypes.number,
};

ApplicantPage.defaultProps = {
  id: null,
};

export default ApplicantPage;
