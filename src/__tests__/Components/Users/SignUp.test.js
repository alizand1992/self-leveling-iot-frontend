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

  describe('onChange', () => {
    describe('first_name change', () => {
      wrapper.find({ id: 'first_name' }).simulate('change', { target: { value: 'John' } });

      it('updates the first_name state', () => {
        expect(wrapper.state('first_name')).toBe('John');
      });
    });

    describe('last_name change', () => {
      wrapper.find({ id: 'last_name' }).simulate('change', { target: { value: 'Smith' } });

      it('updates the last_name state', () => {
        expect(wrapper.state('last_name')).toBe('Smith');
      });
    });

    describe('email change', () => {
      wrapper.find({ id: 'email' }).simulate('change', { target: { value: 'john.smith@gmail.com' } });

      it('updates the email state', () => {
        expect(wrapper.state('email')).toBe('john.smith@gmail.com');
      });
    });

    describe('password change',  () => {
      wrapper.find({ id: 'password' }).simulate('change', { target: { value: 'password123' } });

      it('updates the password state', () => {
        expect(wrapper.state('password')).toBe('password123');
      });
    });

    describe('confirm_password change',  () => {
      wrapper.find({ id: 'confirm_password' }).simulate('change', { target: { value: 'password123' } });

      it('updates the confirm_password state', () => {
        expect(wrapper.state('confirm_password')).toBe('password123');
      });
    });
  });
});