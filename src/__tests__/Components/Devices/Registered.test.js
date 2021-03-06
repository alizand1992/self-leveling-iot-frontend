import React from 'react';

import { shallow } from 'enzyme';
import { v4 as uuidv4 } from 'uuid';

import Registered from '../../../Components/Devices/Registered';

describe('Unregistered', () => {
  const wrapper = shallow(<Registered />);

  describe('no devices have been loaded yet', () => {
    it('renders loading', () => {
      expect(wrapper.find('Loading')).toHaveLength(1);
    });
  });

  describe('no devices are available', () => {
    beforeEach(() => {
      wrapper.setState({ devices: [] });
    });

    it('renders Alert', () => {
      expect(wrapper.find('Alert')).toHaveLength(1);
    });

    it('renders the alert as warning', () => {
      expect(wrapper.find({ variant: 'warning' })).toHaveLength(1);
    });

    it('renders the text', () => {
      expect(wrapper.find('Alert').text()).toBe('There are no devices registered for this user.');
    });
  });

  describe('with registered devices', () => {
    const devices = [
      {
        aws_device_id: uuidv4(),
        device_name: 'Front porch table',
      },
      {
        aws_device_id: uuidv4(),
        device_name: 'Back porch table',
      },
    ];

    beforeEach(() => {
      wrapper.setState({ devices });
    });

    it('renders DeviceTable', () => {
      expect(wrapper.find('DeviceTable')).toHaveLength(1);
    });
  });
});
