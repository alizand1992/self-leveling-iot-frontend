import React from 'react';

import { shallow } from 'enzyme';

import Menu from '../../../Components/Common/Menu';

describe('Menu tests', () => {
  const wrapper = shallow(<Menu />);

  it('common elements are present', () => {
    expect(wrapper.find('Navbar')).toHaveLength(1);
    expect(wrapper.find('Nav')).toHaveLength(2);
    expect(wrapper.find('NavbarBrand')).toHaveLength(1);
    expect(wrapper.find('NavbarToggle')).toHaveLength(1);
    expect(wrapper.find('NavbarCollapse')).toHaveLength(1);
  });

  describe('User is signed out', () => {
    it('renders signed out components', () => {
      expect(wrapper.find('NavDropdown').length).toEqual(1);
      expect(wrapper.find({ to: '/user/sign_in' }).text()).toBe('Sign In');
      expect(wrapper.find({ to: '/user/sign_up' }).text()).toBe('Sign Up');
    });
  });

  describe('User is signed in', () => {
    beforeEach(() => {
      const localStorageMock = (function() {
        let store = {
          'authorization': true,
        };

        return {
          getItem: function(key) {
            return store[key] || null;
          },
          setItem: function(key, value) {
            store[key] = value.toString();
          },
          clear: function() {
            store = {};
          }
        };
      })();

      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
    });

    it('renders signed in components', () => {
      const signedInWrapper = shallow(<Menu />);

      expect(signedInWrapper.find('NavDropdown')).toHaveLength(2);
      expect(signedInWrapper.find({ to: '/user/profile' }).text()).toBe('Profile');
      expect(signedInWrapper.find({ to: '/user/sign_out' }).text()).toBe('Sign Out');

      expect(signedInWrapper.find({ to: '/notifications' }).text()).toBe('List Notifications');
      expect(signedInWrapper.find({ to: '/notifications/new' }).text()).toBe('Create Notification');

      expect(signedInWrapper.find('NavLink')).toHaveLength(1);
      expect(signedInWrapper.find({ to: '/devices/' }).text()).toBe('Devices');
    });
  });
});
