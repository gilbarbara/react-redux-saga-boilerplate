import React from 'react';
import { render } from 'test-utils';

import Background from '~/components/Background';

describe('Background', () => {
  it('should render properly', () => {
    const { container } = render(<Background />);

    expect(container).toMatchSnapshot();
  });
});
