import React from 'react';
import { render } from 'test-utils';

import Footer from '~/components/Footer';

describe('Footer', () => {
  it('should render properly', () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
