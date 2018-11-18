import React from 'react';

import NotFound from 'routes/NotFound';

function setup() {
  return mount(<NotFound />);
}

describe('NotFound', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect to home', () => {
    navigate({ pathname: '/some-page' });

    wrapper.find('Link').simulate('click');
    expect(location.pathname).toBe('/');
  });
});
