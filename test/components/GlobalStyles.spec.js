import React from 'react';

import GlobalStyles from 'components/GlobalStyles';

describe('GlobalStyles', () => {
  const wrapper = mount(<GlobalStyles />);

  it('should render properly', () => {
    expect(wrapper.state('globalStyle')).toMatchSnapshot();
  });
});
