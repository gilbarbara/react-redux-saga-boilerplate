import React from 'react';

import Footer from 'components/Footer';

function setup() {
  return mount(<Footer />);
}

describe('Footer', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
