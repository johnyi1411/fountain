import React from 'react';

class EmployerJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicants: [
        {
          id: 1,
          name: 'eileen',
        },
        {
          id: 2,
          name: 'justin',
        },
      ],
    };
  }

  render() {
    const { match } = this.props;
    const { id, employer } = match.params;
    const { applicants } = this.state;
    return (
      <div key={id} className="employer-jobs">
        <div>
          {applicants.map((applicant) => <p key={applicant.id}>{applicant.name}</p>)}
        </div>
      </div>
    );
  }
}

export default EmployerJob;
