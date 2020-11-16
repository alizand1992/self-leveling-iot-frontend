import React from 'react';

import { shallow } from 'enzyme';

import List from '../../../Components/Triggers/List';

describe('Trigger > List', () => {
  describe('no notification id', () => {
    const wrapper = shallow(<List />);

    it('renders null', () => {
      expect(wrapper.type()).toBeNull();
    });
  });

  describe('with notification id', () => {
    describe('no triggers', () => {
      const wrapper = shallow(<List notificationId={1} />);

      it('renders loading', () => {
        expect(wrapper.find('Loading')).toHaveLength(1);
      });
    });

    describe('with triggers', () => {
      const wrapper = shallow(<List notificationId={1} />);

      beforeEach(() => {
        wrapper.setState({
          triggers: [
            {
              id: 1,
              aws_column: 'battery',
              relationship: 'less_than',
              notificationId: 1,
              value: 20,
            },
            {
              id: 2,
              aws_column: 'battery',
              relationship: 'less_than',
              notificationId: 1,
              value: 30,
            },
          ],
        });
      });

      it('has as many TriggerForms as there are triggers', () => {
        expect(wrapper.find('TriggerForm')).toHaveLength(2);
      });

      it('passes down all the fields', () => {
        expect(wrapper.find({ id: 1 })).toHaveLength(1);
        expect(wrapper.find({ name: 'battery' })).toHaveLength(2);
        expect(wrapper.find({ relationship: 'less_than' })).toHaveLength(2);
        expect(wrapper.find({ notificationId: 1 })).toHaveLength(2);
        expect(wrapper.find({ value: 20 })).toHaveLength(1);
      });
    });
  });
});
