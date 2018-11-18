import React from 'react';

import Icon from 'components/Icon';

describe('Icon', () => {
  const wrapper = mount(<Icon name="check" />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
