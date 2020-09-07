import React from 'react';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SignUp from '../../../Components/Users/SignUp';

const mockStore = configureStore({});

describe('Sign Up', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({});
    wrapper = shallow(<SignUp store={store} />).dive();
  });

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

  it('returns undefined from signUp with erros', () => {
    expect(wrapper.instance().submit()).toBe(undefined);
  });

  describe('onChange', () => {
    describe('first_name change', () => {
      it('updates the first_name state', () => {
        wrapper.find({ id: 'first_name' }).simulate('change', { target: { value: 'John' } });

        expect(wrapper.state('first_name')).toBe('John');
      });
    });

    describe('last_name change', () => {
      it('updates the last_name state', () => {
        wrapper.find({ id: 'last_name' }).simulate('change', { target: { value: 'Smith' } });

        expect(wrapper.state('last_name')).toBe('Smith');
      });
    });

    describe('email change', () => {
      it('updates the email state', () => {
        wrapper.find({ id: 'email' }).simulate('change', { target: { value: 'john.smith@gmail.com' } });

        expect(wrapper.state('email')).toBe('john.smith@gmail.com');
      });
    });

    describe('password change',  () => {
      it('updates the password state', () => {
        wrapper.find({ id: 'password' }).simulate('change', { target: { value: 'password123' } });

        expect(wrapper.state('password')).toBe('password123');
      });
    });

    describe('confirm_password change',  () => {
      it('updates the confirm_password state', () => {
        wrapper.find({ id: 'confirm_password' }).simulate('change', { target: { value: 'password123' } });

        expect(wrapper.state('confirm_password')).toBe('password123');
      });
    });
  });

  describe('with all the values', () => {
    it('calls signUp', () => {
      const userAjax = require('../../../Util/Ajax/Users');
      const signUp = jest.spyOn(userAjax, 'signUp');

      wrapper.setState({
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith.gmail.com',
        password: 'password123',
        confirm_password: 'password123',
      });

      wrapper.instance().submit();

      expect(signUp).toBeCalled();
    });
  });
});
