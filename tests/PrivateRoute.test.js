/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Route } from 'react-router-dom';
import PrivateRoute from '../src/components/PrivateRoute';

Enzyme.configure({ adapter: new Adapter() });

describe('PrivateRoute', () => {
  it('renders Route', () => {
    const wrapper = shallow(<PrivateRoute />);
    expect(wrapper.find(Route)).toHaveLength(1);
  });
});
