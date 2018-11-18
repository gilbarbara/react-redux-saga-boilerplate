import React from 'react';

import Transition from 'components/Transition/index';

describe('Transition', () => {
  it('should render properly', () => {
    const wrapper = mount(
      <Transition transition="fade">
        <div className="transition" />
      </Transition>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should not render if transition don\'t exist', () => {
    const wrapper = mount(
      <Transition transition="rotate">
        <div className="transition" />
      </Transition>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
