import React from 'react';

import { shallow, mount } from 'enzyme';

import Notifications from '../../../Components/Notifications';

describe('Notifications', () => {
  const wrapper = shallow(<Notifications />);

  describe('while notifications are loading', () => {
    it('renders a loding component', () => {
      expect(wrapper.find('Loading')).toHaveLength(1);
    });

    it('has the correct message for loading', () => {
      expect(
        wrapper
          .find('Loading')
          .find({ message: 'Your notifications are being loaded...' })
      ).toHaveLength(1);
    });
  });

  describe('done loading', () => {
    const notificationAjax = require('../../../Util/Ajax/Notifications');

    describe('no notifications', () => {
      beforeEach(() => {
        jest.spyOn(notificationAjax, 'getNotifications')
          .mockImplementation((res) => res([]));
        wrapper.instance().componentDidMount();
      });

      it('renders message for no notifications', () => {
        expect(wrapper.text()).toContain('There are no notifications');
      });

      it('contains a link to create new notification', () => {
        expect(wrapper.find('Link').find({ to: '/notifications/new'})).toHaveLength(1);
      });
    });

    describe('with notifications', () => {
      beforeEach(() => {
        jest.spyOn(notificationAjax, 'getNotifications')
          .mockImplementation((res) => res([
            {
              id: 1,
              name: 'Low Battery',
              description: 'Notify user when the battery is below 20%.'
            },
            {
              id: 2,
              name: 'Very Low Battery',
              description: 'Notify user when the battery is below 5%.'
            },
          ]));
        wrapper.instance().componentDidMount();
      });
    });
  });
});
