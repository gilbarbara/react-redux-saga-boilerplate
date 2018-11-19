import React from 'react';

import GlobalStyles from 'components/GlobalStyles';

describe('GlobalStyles', () => {
  const wrapper = mount(<GlobalStyles />);

  it('should render properly', () => {
    expect(document.head.querySelector('[data-styled]')).not.toBeNull();
    expect(wrapper.find('GlobalStyleComponent').instance().state.globalStyle).toMatchSnapshot();
  });
});
