import React from 'react';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ProtectedRoute from '../../../Components/Common/ProtectedRoute';

const mockStore = configureStore({});

describe('ProtectedRoute', () => {
  let store;
  let wrapper;

  describe('user logged in', () => {
    beforeEach(() => {
      store = mockStore({
        user: {
          authorization: 'bearer some_hex',
        },
      });

      wrapper = shallow(
        <ProtectedRoute store={store}>
          <div>Child Component</div>
        </ProtectedRoute>
      ).dive().dive();
    });

    it('renders the child component', () => {
      expect(wrapper.find('div')).toHaveLength(1);
    });

    it('renders the content', () => {
      expect(wrapper.find('div').text()).toBe('Child Component');
    });
  });

  describe('user is NOT logged in', () => {
    beforeEach(() => {
      store = mockStore({
        user: {},
      });

      wrapper = shallow(
        <ProtectedRoute store={store}>
          <div>Child Component</div>
        </ProtectedRoute>
      ).dive().dive();
    });

    it('renders redirect', () => {
      expect(wrapper.find('Redirect')).toHaveLength(1);
    });

    it('has a path to sign_in', () => {
      expect(wrapper.find('Redirect').props().to).toBe('/user/sign_in');
    });
  });
});
