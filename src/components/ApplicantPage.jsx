/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

class ApplicantPage extends React.Component {
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
      applications: { 1: true },
    };

    this.goBack = this.goBack.bind(this);
    this.handleApply = this.handleApply.bind(this);
  }

  goBack() {
    const { history, handleUserChange } = this.props;
    handleUserChange(null, null);
    history.goBack();
  }

  handleApply(id) {
    const { applications } = this.state;
    this.setState({ applications: { ...applications, [id]: true } });
  }

  render() {
    const { jobs, applications } = this.state;

    return (
      <div>
        {jobs.map((job) => (
          <div key={job.id} className="applicant-jobs">
            <p>{`Employer: ${job.employer}`}</p>
            <p>{`Title: ${job.title}`}</p>
            <p>{`Description: ${job.description}`}</p>
            {applications[job.id] ? <p>Applied</p> : <button className="apply-button" type="button" onClick={() => this.handleApply(job.id)}>Apply</button>}
          </div>
        ))}
        <button id="logout-button" type="button" onClick={this.goBack}>Logout</button>
      </div>
    );
  }
}

ApplicantPage.propTypes = {
  history: PropTypes.object.isRequired,
  handleUserChange: PropTypes.func.isRequired,
};

export default ApplicantPage;
