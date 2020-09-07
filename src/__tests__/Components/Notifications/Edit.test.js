import React from 'react';

import { shallow } from 'enzyme';
import Edit from '../../../Components/Notifications/Edit';

describe('Notification > Edit', () => {
  describe('Without props', () => {
    const wrapper = shallow(<Edit />);

    it('sets name as an empty string', () => {
      expect(wrapper.state().name).toBe('');
    });

    it('sets description as an empty string', () => {
      expect(wrapper.state().description).toBe('');
    });

    it('renders a card', () => {
      expect(wrapper.find('Card')).toHaveLength(1);
    });

    it('renders "Edit Notification" in the CardHeader', () => {
      expect(wrapper.find('CardHeader').text()).toBe('Edit Notification');
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

    it('Passes Update as the buttonText', () => {
      expect(wrapper.find('NotificationsForm').find({ buttonText: 'Update' })).toHaveLength(1);
    });
  });

  describe('With props', () => {
    const wrapper = shallow(<Edit name="Low Battery" description="Notify user when battery is low." />);

    it('sets name as prop value', () => {
      expect(wrapper.state().name).toBe('Low Battery');
    });

    it('sets description as prop value', () => {
      expect(wrapper.state().description).toBe('Notify user when battery is low.');
    });
  });
});
