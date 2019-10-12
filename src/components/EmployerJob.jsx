/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class EmployerJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicants: [],
    };

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id, employer } = match.params;
    axios.get(`/employer/${employer}/job/${id}/applicant`)
      .then((results) => this.setState({ applicants: results.data }))
      .catch((error) => console.log('error getting applicants', error));
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
          {applicants.map((applicant, i) => <p key={applicant.applicant_id}>{`${i + 1}. ${applicant.first_name} ${applicant.last_name}`}</p>)}
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
