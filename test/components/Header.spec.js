import expect, { createSpy } from 'expect';
import React from 'react';
import { mount } from 'enzyme';

import Header from 'components/Header';

const dispatch = createSpy();

function setup() {
  const props = {
    dispatch,
    location: {
      pathname: '/'
    },
    app: {}
  };

  return mount(<Header {...props} />);
}

describe('Header', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance()).toBeA(React.Component);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app__header').length).toBe(1);
    expect(wrapper.find('.app__header__logo').length).toBe(1);
  });
});
