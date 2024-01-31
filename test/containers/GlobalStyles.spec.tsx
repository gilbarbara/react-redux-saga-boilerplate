import React from 'react';
import { render } from 'test-utils';

import GlobalStyles from '~/containers/GlobalStyles';

describe('GlobalStyles', () => {
  it('should render properly', () => {
    render(<GlobalStyles />);

    expect(document.querySelector('head')?.innerHTML).toMatchSnapshot();
  });
});
