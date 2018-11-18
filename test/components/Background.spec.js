import React from 'react';

import Background from 'components/Background';

describe('Background', () => {
  const wrapper = mount(<Background />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
