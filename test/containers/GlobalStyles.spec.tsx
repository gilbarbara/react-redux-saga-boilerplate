import React from 'react';

import GlobalStyles from 'containers/GlobalStyles';

import { render } from 'test-utils';

describe('GlobalStyles', () => {
  it('should render properly', () => {
    render(<GlobalStyles />);
    console.log(document.querySelector('head'));
    expect(document.querySelector('head')?.innerHTML).toMatchSnapshot();
  });
});
