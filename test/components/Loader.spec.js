import React from 'react';

import Loader from 'components/Loader';

describe('Loader', () => {
  let wrapper;

  describe('with type `grow` (default)', () => {
    it('should render properly', () => {
      wrapper = mount(<Loader />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render properly with options', () => {
      wrapper = mount(<Loader block size="10rem" />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('with type `pulse`', () => {
    it('should render properly', () => {
      wrapper = mount(<Loader type="pulse" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render properly with options', () => {
      wrapper = mount(<Loader block type="pulse" size="10rem" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('with type `rotate`', () => {
    it('should render properly', () => {
      wrapper = mount(<Loader type="rotate" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render properly with options', () => {
      wrapper = mount(<Loader block type="rotate" size="10rem" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
