import React from 'react';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Profile from '../../../Components/Users/Profile';

const mockStore = configureStore({});

describe('Profile', () => {
  let store;
  let wrapper;
  const date = new Date(0);

  beforeEach(() => {
    store = mockStore({
      user: {
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@gmail.com',
        created_at: date,
        authorization: 'bearer some_hex',
      },
    });

    wrapper = shallow(<Profile store={store} />).dive().dive();
  });

  it('has a card', () => {
    expect(wrapper.find('Card')).toHaveLength(1);
  });

  it('says Profile in the Card header', () => {
    expect(wrapper.find('CardHeader').text()).toBe('Profile');
  });

  it('renders the first name', () => {
    expect(wrapper.find('CardBody').text()).toContain('John');
  });

  it('renders the last name', () => {
    expect(wrapper.find('CardBody').text()).toContain('Smith');
  });

  it('renders the email', () => {
    expect(wrapper.find('CardBody').text()).toContain('john.smith@gmail.com');
  });

  it('renders the joined label', () => {
    expect(wrapper.find('CardBody').text()).toContain('Joined:');
  });

  it('renders the joined date', () => {
    expect(wrapper.find('CardBody').text()).toContain(`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`);
  });
});
