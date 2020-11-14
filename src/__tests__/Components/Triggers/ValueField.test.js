import React from 'react';

import { shallow } from 'enzyme';

import ValueField from '../../../Components/Triggers/ValueField';

describe('ValueField', () => {
  describe('disabled', () => {
    const wrapper = shallow(<ValueField disabled={true} />);

    it('Renders a field', () => {
      expect(wrapper.find('FormControl')).toHaveLength(1);
    });

    it('the field is disabled', () => {
      expect(wrapper.find('FormControl').props()['disabled']).toBe(true);
    });
  });

  describe('not disabled', () => {
    const onChange = jest.fn();

    describe('is a float', () => {
      const wrapper = shallow(<ValueField triggerType={'float'} onChange={onChange} />);

      it('Renders a field', () => {
        expect(wrapper.find('FormControl')).toHaveLength(1);
      });

      it('sets ths state on change', () => {
        wrapper.find('FormControl').simulate('change', { target: { value: 42.42 } });
        expect(wrapper.state().value).toBe(42.42);
      });

      it('onChange function gets called', () => {
        wrapper.find('FormControl').simulate('change', { target: { value: 42.42 } });
        expect(onChange).toBeCalled();
      });
    });

    describe('is a bool', () => {
      const wrapper = shallow(
        <ValueField triggerType={'bool'}
                    onChange={onChange}
                    options={{ true: 'true', false: 'false' }} />
      );

      it('is a select type', () => {
        expect(wrapper.find('FormControl').props()['as']).toBe('select');
      });

      it('sets ths state on change', () => {
        wrapper.find('FormControl').simulate('change', { target: { value: true } });
        expect(wrapper.state().value).toBe(true);
      });

      it('onChange function gets called', () => {
        wrapper.find('FormControl').simulate('change', { target: { value: true } });
        expect(onChange).toBeCalled();
      });

      it('shows all the options', () => {
        expect(wrapper.find('option')).toHaveLength(3);
      });
    });
  });
});
