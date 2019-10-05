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
    const { handleNewJob, id } = this.props;
    const { title, description } = this.state;

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        handleNewJob(title, description, id);
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
    );
  }
}

NewJobForm.propTypes = {
  handleNewJob: PropTypes.func.isRequired,
  id: PropTypes.number,
};

NewJobForm.defaultProps = {
  id: null,
};

export default NewJobForm;
