import React from 'react';
import { fireEvent, render, screen } from 'test-utils';

import ErrorHandler from '~/components/ErrorHandler';

const mockResetError = vi.fn();

describe('ErrorHandler', () => {
  it('should render the error and clicks', () => {
    render(<ErrorHandler error={new Error('Oh No!')} resetErrorBoundary={mockResetError} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('ErrorHandler')).toMatchSnapshot();
    expect(mockResetError).toHaveBeenCalledTimes(1);
  });
});
