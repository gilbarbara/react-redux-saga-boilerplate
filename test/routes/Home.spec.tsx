import React from 'react';
import { fireEvent, render, screen } from 'test-utils';

import { login } from '~/actions';

import Home from '~/routes/Home';

const mockDispatch = vi.fn();

describe('Home', () => {
  it('should render properly', () => {
    render(<Home />);
    expect(screen.getByTestId('Home')).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    render(<Home />, { mockDispatch });
    fireEvent.click(screen.getByTestId('Start'));

    expect(mockDispatch).toHaveBeenCalledWith(login());
  });
});
