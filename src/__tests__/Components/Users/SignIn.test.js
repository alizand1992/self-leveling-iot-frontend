import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from '../../../Components/Users/SignIn';

configure({ adapter: new Adapter() });

describe('Sign In', () => {
  const wrapper = shallow(<SignIn />);

  it('has a Card', () => {
    expect(wrapper.find('Card')).toHaveLength(1);
  });

  it('has a Form', () => {
    expect(wrapper.find('Form')).toHaveLength(1);
  });

  it('has an email field', () => {
    expect(wrapper.find({ id: 'email' })).toHaveLength(1);
  });

  it('has a password field', () => {
    expect(wrapper.find({ id: 'password' })).toHaveLength(1);
  });

  it('has a Sign In button', () => {
    expect(wrapper.find('Button').text()).toBe('Sign In');
  });

  describe('with changes to the email field', () => {
    wrapper.find({ id: 'email' }).simulate('change', { target: { value: 'john.smith@gmail.com' }});

    it('updates the state email', () => {
      expect(wrapper.state('email')).toBe('john.smith@gmail.com');
    });
  });

  describe('with changes to the password field', () => {
    wrapper.find({ id: 'password' }).simulate('change', { target: { value: 'password123' }});

    it('updates the state password', () => {
      expect(wrapper.state('password')).toBe('password123');
    });
  });
});