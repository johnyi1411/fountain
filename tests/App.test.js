import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/components/App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders ', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
