import React from 'react';

import { shallow } from 'enzyme';

import Devices from '../../../Components/Devices';

describe('Devices', () => {
  const wrapper = shallow(<Devices />);

  it('renders registered list', () => {
    expect(wrapper.find('Registered')).toHaveLength(1);
  });

  it('renders unregistered list', () => {
    expect(wrapper.find('Unregistered')).toHaveLength(1);
  });
});
