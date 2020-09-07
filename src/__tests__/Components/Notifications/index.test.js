import React from 'react';

import { shallow } from 'enzyme';

import Notifications from '../../../Components/Notifications';

describe('Notifications', () => {
  describe('loading', () => {
    const wrapper = shallow(<Notifications />);

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
});
