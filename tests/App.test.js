/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Route } from 'react-router-dom';
import App from '../src/components/App';
import PrivateRoute from '../src/components/PrivateRoute';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders Routes and Private Routes', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Route)).toHaveLength(2);
    expect(wrapper.find(PrivateRoute)).toHaveLength(2);
  });
});
