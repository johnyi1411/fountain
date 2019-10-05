import React from 'react';

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
      applications: [],
    };
  }

  render() {
    const { jobs } = this.state;

    return (
      <div>
        {jobs.map((job) => (
          <div key={job.id} className="applicant-jobs">
            <p>{`Employer: ${job.employer}`}</p>
            <p>{`Title: ${job.title}`}</p>
            <p>{`Description: ${job.description}`}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ApplicantPage;
