import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import SignIn from '../../../Components/Users/SignIn';

configure({ adapter: new Adapter() });
const mockStore = configureStore({});

describe('Sign In', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({});
    wrapper = shallow(<SignIn store={store} />).dive();
  });

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

  it('has an empty array for errors', () => {
    expect(wrapper.state('errors')).toHaveLength(0);
  });

  describe('with changes to the email field', () => {
    it('updates the state email', () => {
      wrapper.find({ id: 'email' }).simulate('change', { target: { value: 'john.smith@gmail.com' }});
      expect(wrapper.state('email')).toBe('john.smith@gmail.com');
    });

    afterAll(() => {
      wrapper.find({ id: 'email' }).simulate('change', { target: { value: '' }});
    });
  });

  describe('with changes to the password field', () => {
    it('updates the state password', () => {
      wrapper.find({ id: 'password' }).simulate('change', { target: { value: 'password123' } });
      expect(wrapper.state('password')).toBe('password123');
    });

    afterAll(() => {
      wrapper.find({ id: 'password' }).simulate('change', { target: { value: '' }});
    });
  });

  describe('Sign In triggered', () => {
    describe('no values', () => {
      beforeEach(() => {
        wrapper.find('Button').simulate('click');
      });

      describe('No email entered', () => {
        it('has an error for email in the state', () => {
          expect(wrapper.state('errors')).toContain('Email cannot be empty.');
        });

        it('shows an error on the screen', () => {
          expect(wrapper.find('Alert').text()).toContain('Email cannot be empty.');
        });
      });

      describe('No password entered', () => {
        it('has an error for password in the state', () => {
          expect(wrapper.state('errors')).toContain('Password cannot be empty.');
        });

        it('shows an error on the screen', () => {
          expect(wrapper.find('Alert').text()).toContain('Password cannot be empty.');
        });
      });
    });

    describe('with values', () => {
      describe('acceptable values', () => {
        beforeEach(() => {
          wrapper.find({ id: 'email' }).simulate('change', { target: { value: 'john.smith@gmail.com' }});
          wrapper.find({ id: 'password' }).simulate('change', { target: { value: 'password123' }});
          wrapper.find('Button').simulate('click');
        });

        it('has no errors', () => {
          expect(wrapper.state('errors')).toHaveLength(0);
        });

        it('does not show an alert', () => {
          expect(wrapper.find('Alert')).toHaveLength(0);
        });
      });

      describe('password too short', () => {
        beforeEach(() => {
          wrapper.find({ id: 'email' }).simulate('change', { target: { value: 'john.smith@gmail.com' }});
          wrapper.find({ id: 'password' }).simulate('change', { target: { value: 'a' }});
          wrapper.find('Button').simulate('click');
        });

        it('has an error', () => {
          expect(wrapper.state('errors')).toHaveLength(1);
        });

        it('has an alert with the correct message', () => {
          expect(wrapper.find('Alert').text()).toBe('Password needs to be at least 6 characters.');
        });
      });
    });
  });
});
