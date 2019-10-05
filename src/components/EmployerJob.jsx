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

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { match } = this.props;
    const { id, employer } = match.params;
    const { applicants } = this.state;
    return (
      <div key={id}>
        <div className="employer-jobs">
          <p>{`Job ID: ${id}`}</p>
          <p>{`Employer: ${employer}`}</p>
          <h1>Applicants</h1>
          {applicants.map((applicant) => <p key={applicant.id}>{applicant.name}</p>)}
        </div>
        <button type="button" onClick={this.goBack}>Go Back</button>
      </div>
    );
  }
}

export default EmployerJob;
