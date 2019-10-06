/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import EmployerPage from '../src/components/EmployerPage';

Enzyme.configure({ adapter: new Adapter() });

describe('EmployerPage', () => {
  it('renders jobs in state with changes', () => {
    const props = {
      history: {},
      handleUserChange: jest.fn(),
      id: 1,
      user: 'employer',
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/employer']}>
        <EmployerPage {...props} />
      </MemoryRouter>,
    );
    console.log(wrapper.debug());
    expect(wrapper.find('div.employer-jobs')).toHaveLength(2);
  });

  // it('render apply-button correctly according to applications', () => {
  //   const props = {
  //     history: {},
  //     handleUserChange: jest.fn(),
  //   };
  //   const wrapper = shallow(<ApplicantPage {...props} />);
  //   expect(wrapper.find('button.apply-button')).toHaveLength(1);
  //   wrapper.setState({
  //     applications: {
  //       1: true,
  //       2: true,
  //     },
  //   });
  //   expect(wrapper.find('button.apply-button')).toHaveLength(0);
  // });

  // TO DO
  // Create test for apply button functionality
});
