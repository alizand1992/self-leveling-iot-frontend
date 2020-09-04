import React from 'react';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SignIn from '../../../Components/Users/SignIn';

const mockStore = configureStore({});

describe('Sign In', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      user: {}
    });
    wrapper = shallow(<SignIn store={store} />).dive().dive();
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
          expect(wrapper.find('Errors').html()).toContain('Email cannot be empty.');
        });
      });

      describe('No password entered', () => {
        it('has an error for password in the state', () => {
          expect(wrapper.state('errors')).toContain('Password cannot be empty.');
        });

        it('shows an error on the screen', () => {
          expect(wrapper.find('Errors').html()).toContain('Password cannot be empty.');
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
          expect(wrapper.find('Errors').html()).toContain('Password needs to be at least 6 characters.');
        });
      });
    });
  });

  describe('Already Signed In', () => {
    beforeEach(() => {
      store = mockStore({
        user: {
          authorization: 'bearer some_hex',
        },
      });
      wrapper = shallow(<SignIn store={store} />).dive().dive();
    });

    it('redirects', () => {
      expect(wrapper.find('Redirect')).toHaveLength(1);
    });

    it('has a path to root', () => {
      expect(wrapper.find('Redirect').props().to).toBe('/');
    });
  });
});
