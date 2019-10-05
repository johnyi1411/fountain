/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

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
    const { history } = this.props;
    history.goBack();
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

EmployerJob.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default EmployerJob;
