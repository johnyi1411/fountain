import React from 'react';
import PropTypes from 'prop-types';

class NewJobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  render() {
    const { handleNewJob, id, user } = this.props;
    const { title, description } = this.state;

    return (
      <div>
        <h1>Create New Job</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleNewJob(title, description, id, user);
        }}
        >
          <label htmlFor="title">
            Title:
            <input type="text" onChange={this.handleTitleChange} />
          </label>
          <label htmlFor="description">
            Description:
            <input type="text" onChange={this.handleDescriptionChange} />
          </label>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

NewJobForm.propTypes = {
  handleNewJob: PropTypes.func.isRequired,
  id: PropTypes.number,
  user: PropTypes.string,
};

NewJobForm.defaultProps = {
  id: null,
  user: null,
};

export default NewJobForm;
