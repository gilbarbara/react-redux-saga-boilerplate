import React from 'react';
import { mount } from 'enzyme';
import Logo from 'components/Logo';

describe('Logo', () => {
  const wrapper = mount(<Logo />);

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance()).toBeNull();
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
