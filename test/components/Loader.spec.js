import React from 'react';

import Loader from 'components/Loader';

function setup(type = 'pulse') {
  return mount(<Loader type={type} />);
}

describe('Loader', () => {
  let wrapper;

  it('should render properly with pulse type', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly with rotate type', () => {
    wrapper = setup('rotate');

    expect(wrapper).toMatchSnapshot();
  });
});
