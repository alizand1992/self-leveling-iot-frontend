import React from 'react';

import { shallow } from 'enzyme';

import Loading from '../../../Components/Common/Loading';

describe('Loading', () => {
  describe('without a message', () => {
    const wrapper = shallow(<Loading />);

    it('renders a Loading component', () => {
      expect(wrapper.find('Loading')).toHaveLength(1);
    });

    it('does not render a row', () => {
      expect(wrapper.find('Row')).toHaveLength(0);
    });
  });

  describe('with a message', () => {
    const wrapper = shallow(<Loading message="What is loading" />);

    it('renders a Loading component', () => {
      expect(wrapper.find('Loading')).toHaveLength(1);
    });

    it('renders the messsage', () => {
      expect(wrapper.find('Col').text()).toContain('What is loading');
    });
  });
});
