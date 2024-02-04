import React from 'react';
import { fireEvent, render, screen } from 'test-utils';

import { logOut } from '~/actions';

import Header from '~/components/Header';

const mockDispatch = vi.fn();

describe('Header', () => {
  it('should render properly', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toMatchSnapshot();
  });

  it('should handle clicks', async () => {
    render(<Header />, { mockDispatch });
    fireEvent.click(screen.getByRole('button')!);

    expect(mockDispatch).toHaveBeenCalledWith(logOut());
  });
});
