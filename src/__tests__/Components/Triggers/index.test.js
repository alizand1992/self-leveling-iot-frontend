import React from 'react';

import { shallow } from 'enzyme';

import Triggers from '../../../Components/Triggers/';

describe('Triggers', () => {
  const wrapper = shallow(<Triggers notificationId={1} />);

  it('renders the List of triggers', () => {
    expect(wrapper.find('List')).toHaveLength(1);
  });

  it('passes notificationId to all components', () => {
    expect(wrapper.find('List').props()['notificationId']).toBe(1);
    expect(wrapper.find('TriggerForm').props()['notificationId']).toBe(1);
  });

  it('renders a trigger form', () => {
    expect(wrapper.find('TriggerForm')).toHaveLength(1);
  });
});
