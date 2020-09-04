import React from 'react';

import { shallow } from 'enzyme';

import Errors from '../../../Components/Common/Errors';

describe('Errors', () => {
  describe('without errors', () => {
    const wrapper = shallow(<Errors />);

    it('prints nothing', () => {
      expect(wrapper.instance()).toBeNull();
    });
  });

  describe('empty error array', () => {
    const wrapper = shallow(<Errors errors={[]} />);

    it('prints nothing', () => {
      expect(wrapper.instance()).toBeNull();
    });
  });

  describe('with errors', () => {
    const wrapper = shallow(<Errors errors={['Email cannot be empty']} />);

    it('prints the error', () => {
      expect(wrapper.html()).toContain('Email cannot be empty');
    });

    it('shows an Alert', () => {
      expect(wrapper.find('Alert')).toHaveLength(1);
    });

    it('shows the alert with danger variant', () => {
      expect(wrapper.find({ variant: 'danger' })).toHaveLength(1);
    });
  });
});