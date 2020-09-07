import React from 'react';

import { shallow } from 'enzyme';
import New from '../../../Components/Notifications/New';

describe('Notification > New', () => {
  const wrapper = shallow(<New />);

  it('renders a card', () => {
    expect(wrapper.find('Card')).toHaveLength(1);
  });

  it('renders "New Notification" in the CardHeader', () => {
    expect(wrapper.find('CardHeader').text()).toBe('New Notification');
  });

  it('renders a NotificationsForm', () => {
    expect(wrapper.find('NotificationsForm')).toHaveLength(1);
  });

  it('Passes name to the NotificationsForm', () => {
    wrapper.setState({ name: 'Low Battery'});

    expect(wrapper.find('NotificationsForm').find({ name: 'Low Battery' })).toHaveLength(1);
  });

  it('Passes description to the NotificationsForm', () => {
    wrapper.setState({ description: 'Notify user when the battery goes below 20%.'});

    expect(
      wrapper
        .find('NotificationsForm')
        .find({ description: 'Notify user when the battery goes below 20%.' })
    ).toHaveLength(1);
  });
});
