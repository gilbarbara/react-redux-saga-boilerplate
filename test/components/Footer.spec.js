import expect, { createSpy } from 'expect';
import React from 'react';
import { mount } from 'enzyme';

import Footer from 'components/Footer';

const dispatch = createSpy();

function setup() {
  const props = {
    app: {},
    dispatch
  };

  return mount(<Footer {...props} />);
}

describe('Footer', () => {
  const wrapper = setup();

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance().constructor.name).toBe('StatelessComponent');
  });

  it('should render properly', () => {
    expect(wrapper.find('.app__footer').length).toBe(1);
    expect(wrapper.find('.i-creative-commons').length).toBe(1);
  });
});
