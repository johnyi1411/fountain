/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ApplicantPage from '../src/components/ApplicantPage';

Enzyme.configure({ adapter: new Adapter() });

describe('ApplicantPage', () => {
  it('renders jobs in state with changes', () => {
    const props = {
      history: {},
      handleUserChange: jest.fn(),
    };
    const wrapper = shallow(<ApplicantPage {...props} />);
    expect(wrapper.find('div.applicant-jobs')).toHaveLength(2);
    wrapper.setState({
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
        {
          id: 3,
          employer: 'brian',
          title: 'software engineering intern experience',
          description: 'with 6 years',
        },
      ],
    });
    expect(wrapper.find('div.applicant-jobs')).toHaveLength(3);
  });

  it('render apply-button correctly according to applications', () => {
    const props = {
      history: {},
      handleUserChange: jest.fn(),
    };
    const wrapper = shallow(<ApplicantPage {...props} />);
    expect(wrapper.find('button.apply-button')).toHaveLength(1);
    wrapper.setState({
      applications: {
        1: true,
        2: true,
      },
    });
    expect(wrapper.find('button.apply-button')).toHaveLength(0);
  });

  // TO DO
  // Create test for apply button functionality
});
