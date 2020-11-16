import React from 'react';

import { shallow } from 'enzyme';

import TriggerForm from '../../../Components/Triggers/TriggerForm';

describe('TriggerForm', () => {
  describe('with no attributes', () => {
    const wrapper = shallow(<TriggerForm />);

    it('renders a loading page', () => {
      expect(wrapper.find('Loading')).toHaveLength(1);
    });
  });

  describe('with attributes', () => {
    const wrapper = shallow(<TriggerForm />);
    const attributes = {
      battery: {
        relationships: {
          less_than: 'less than',
        },
        text: 'battery',
        trigger_type: 'float',
      },
      level: {
        relationships: {
          equal: 'equal',
        },
        text: 'level',
        trigger_type: 'bool',
      },
    };

    beforeEach(() => {
      wrapper.setState({
        attributes,
      });
    });

    describe('name', () => {
      it('has a name label', () => {
        expect(wrapper.find('FormGroup').first().find('FormLabel').text()).toBe('Name:');
      });

      it('has a name field', () => {
        expect(wrapper.find('FormGroup').first().find('FormControl')).toHaveLength(1);
      });

      it('is a select field', () => {
        expect(wrapper.find('FormGroup').first().find('FormControl').props()['as']).toBe('select');
      });

      it('renders a select option with an empty string value', () => {
        expect(
          wrapper
            .find('FormGroup')
            .first()
            .find('FormControl')
            .children()
            .first()
            .html()
        ).toContain('<option');

        expect(
          wrapper
            .find('FormGroup')
            .first()
            .find('FormControl')
            .children()
            .first({ value: '' })
        ).toHaveLength(1);
      });

      it('renders all the options from attributes', () => {
        Object.keys(attributes).forEach((key) => {
          expect(wrapper.find('option').find({ value: key })).toHaveLength(1);
        });
      });
    });

    describe('relationship', () => {
      beforeEach(() => {
        wrapper.setState({
          name: 'battery',
        });
      });

      it('has a name label', () => {
        expect(wrapper.find('FormGroup').at(1).find('FormLabel').text()).toBe('Relationship:');
      });

      it('has a name field', () => {
        expect(wrapper.find('FormGroup').at(1).find('FormControl')).toHaveLength(1);
      });

      it('is a select field', () => {
        expect(wrapper.find('FormGroup').at(1).find('FormControl').props()['as']).toBe('select');
      });

      it('renders a select option with an empty string value', () => {
        expect(
          wrapper
            .find('FormGroup')
            .at(1)
            .find('FormControl')
            .children()
            .first()
            .html()
        ).toContain('<option');

        expect(
          wrapper
            .find('FormGroup')
            .at(1)
            .find('FormControl')
            .children()
            .first({ value: '' })
        ).toHaveLength(1);
      });

      it('renders all the options from relationships', () => {
        Object.keys(attributes.battery.relationships).forEach((key) => {
          expect(wrapper.find('option').find({ value: key })).toHaveLength(1);
        });
      });
    });

    describe('value', () => {
      it('renders a ValueField', () => {
        expect(wrapper.find('ValueField')).toHaveLength(1);
      });
    });

    describe('without id',  () => {
      it('shows a save button', () => {
        expect(wrapper.find('Button').text()).toBe('Save');
      });

      describe('dirty', () => {
        beforeEach(() => {
          wrapper.setState({
            dirty: true,
            name: 'battery',
            relationship: 'less_than',
            value: '20',
          });
        });

        it('is not disabled', () => {
          expect(wrapper.find('Button').props()['disabled']).toBe(false);
        });
      });

      describe('not dirty', () => {
        beforeEach(() => {
          wrapper.setState({ dirty: false });
        });

        it('is not disabled', () => {
          expect(wrapper.find('Button').props()['disabled']).toBe(true);
        });
      });
    });

    describe('with id', () => {
      beforeEach(() => {
        wrapper.setState({ id: 1 });
      });

      it('shows an update button', () => {
        expect(wrapper.find('Button').first().text()).toBe('Update');
      });

      it('shows a delete button', () => {
        expect(wrapper.find('Button').last().text()).toBe('Delete');
      });

      describe('not dirty', () => {
        beforeEach(() => {
          wrapper.setState({ dirty: false });
        });

        it('is not disabled', () => {
          expect(wrapper.find('Button').first().props()['disabled']).toBe(true);
        });
      });

      describe('dirty', () => {
        beforeEach(() => {
          wrapper.setState({
            dirty: true,
            name: 'battery',
            relationship: 'less_than',
            value: '20',
          });
        });

        it('is not disabled', () => {
          expect(wrapper.find('Button').first().props()['disabled']).toBe(false);
        });
      });
    });
  });
});
