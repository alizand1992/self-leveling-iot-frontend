import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { shallow } from 'enzyme';

import DeviceTable from '../../../Components/Devices/DeviceTable';

describe('Unregistered', () => {
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

  const wrapper = shallow(<DeviceTable devices={devices} />);

  it('has a row for each device', () => {
    expect(wrapper.find('tbody tr')).toHaveLength(2);
  });

  it('renders all of the devices ids', () => {
    devices.forEach(({ aws_device_id }, index) => {
      expect(wrapper.find('tbody tr').at(index).find('td').first().text()).toBe(aws_device_id);
    });
  });
});
