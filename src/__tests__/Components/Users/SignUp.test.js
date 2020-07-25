import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../../../Components/Users/SignUp';

configure({ adapter: new Adapter() });

describe('Sign Up', () => {
  const wrapper = shallow(<SignUp />);

  it('has a Card', () => {
    expect(wrapper.find('Card')).toHaveLength(1);
  });

  it('has a Form', () => {
    expect(wrapper.find('Form')).toHaveLength(1);
  });

  it('has an first_name field', () => {
    expect(wrapper.find({ id: 'first_name' })).toHaveLength(1);
  });

  it('has an last_name field', () => {
    expect(wrapper.find({ id: 'last_name' })).toHaveLength(1);
  });

  it('has an email field', () => {
    expect(wrapper.find({ id: 'email' })).toHaveLength(1);
  });

  it('has a password field', () => {
    expect(wrapper.find({ id: 'password' })).toHaveLength(1);
  });

  it('has a confirm_password field', () => {
    expect(wrapper.find({ id: 'confirm_password' })).toHaveLength(1);
  });

  it('has a Sign Up button', () => {
    expect(wrapper.find('Button').text()).toBe('Sign Up');
  });

});