import React from 'react';
import { render, screen, waitForElementToBeRemoved } from 'test-utils';

import Private from '~/routes/Private';

describe('Private', () => {
  it('should render properly', async () => {
    render(<Private />);

    expect(screen.getByTestId('Private')).toMatchSnapshot();

    await waitForElementToBeRemoved(() => screen.queryByTestId('LoaderPill'));
  });
});
