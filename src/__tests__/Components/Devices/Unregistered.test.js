import React from 'react';

import { shallow } from 'enzyme';
import { v4 as uuidv4 } from 'uuid';

import Unregistered from '../../../Components/Devices/Unregistered';

describe('Unregistered', () => {
  const wrapper = shallow(<Unregistered />);

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
      expect(wrapper.find('Alert').text()).toBe('There are no unregestered devices to display.');
    });
  });

  describe('with unregistered devices', () => {
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

    it('has a row for each device', () => {
      expect(wrapper.find('Row')).toHaveLength(2);
    });

    it('renders all of the devices ids', () => {

      devices.forEach(({ aws_device_id }, index) => {
        expect(wrapper.find('Row').at(index).find('Col').first().text()).toBe(aws_device_id);
      });
    });
  });
});
