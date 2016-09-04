import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Logo from 'components/Logo';

describe('Logo', () => {
  const wrapper = mount(<Logo />);

  it('should be a Component', () => {
    expect(wrapper.instance()).toBeA(React.Component);
  });

  it('should render properly', () => {
    expect(wrapper.find('.isvg').length).toBe(1);
  });
});
