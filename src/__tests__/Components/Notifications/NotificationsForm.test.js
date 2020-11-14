import React from 'react';

import { shallow } from 'enzyme';
import NotificationsForm from '../../../Components/Notifications/NotificationsForm';

describe('NotificationsForm', () => {
  const handleChange = jest.fn();
  const submit = jest.fn();
  const wrapper = shallow(
    <NotificationsForm buttonText="Create"
                       name={'Battery Low'}
                       description={'Notify the user when battery is below 20%'}
                       submit={submit}
                       handleChange={handleChange} />
  );

  it('renders a Form', () => {
    expect(wrapper.find('Form')).toHaveLength(1);
  });

  it('renders Name as first label', () => {
    expect(wrapper.find('FormLabel').first().text()).toBe('Name:');
  });

  it('has an input with placeholder Name', () => {
    expect(wrapper.find('FormControl').find({ placeholder: 'Name' })).toHaveLength(1);
  });

  it('renders Description as Last label', () => {
    expect(wrapper.find('FormLabel').last().text()).toBe('Description:');
  });

  it('has an input with placeholder Description', () => {
    expect(wrapper.find('FormControl').find({ placeholder: 'Description' })).toHaveLength(1);
  });

  it('has a button', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('has a primary button', () => {
    expect(wrapper.find('Button').find({ type: 'primary' })).toHaveLength(1);
  });

  it('has button text inside the button', () => {
    expect(wrapper.find('Button').text()).toBe('Create');
  });

  it('button click triggers submit', () => {
    wrapper.find('Button').simulate('click');
    expect(submit).toBeCalled();
  });

  it('triggers handleChange for each input change', () => {
    wrapper.find('FormControl').forEach((input) => {
      input.simulate('change', { target: { value: 'test' } });
    });

    expect(handleChange).toBeCalledTimes(2);
  });
});
