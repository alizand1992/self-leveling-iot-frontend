import React from 'react';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import SignOut from '../../../Components/Users/SignOut';

const mockStore = configureStore({});

describe('Sign Out', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      user: {
        authorization: 'Some Auth',
      },
    });
    wrapper = shallow(<SignOut store={store} />).dive().dive();
  });

  describe('loading', () => {
    it('renders a loading component', () => {
      expect(wrapper.find('Loading')).toHaveLength(1);
    });

    it('has the correct message for loading', () => {
      expect(
        wrapper
          .find('Loading')
          .find({ message: 'You are being logged out...' })
      ).toHaveLength(1);
    });
  });
});
