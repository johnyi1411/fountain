import React from 'react';

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
      <div>
        {jobs.map((job) => (
          <div key={job.id} className="employer-jobs">
            <p>{`employer: ${job.employer}`}</p>
            <p>{`title: ${job.title}`}</p>
            <p>{`descriptiopn: ${job.description}`}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default EmployerPage;
