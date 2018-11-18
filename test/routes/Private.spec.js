import React from 'react';

import Private from 'routes/Private';

function setup() {
  const props = {
    dispatch: () => {},
    location: {},
  };

  return shallow(<Private {...props} />);
}

describe('Private', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
