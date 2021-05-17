import React from 'react';

import ErrorHandler from 'containers/ErrorHandler';

import { render, screen } from 'test-utils';

const mockOnError = jest.fn();

describe('ErrorHandler', () => {
  const Throws = () => {
    throw new Error('Oh no!');
  };

  it('should handle the error', () => {
    const spy = jest.spyOn(console, 'error');

    spy.mockImplementation(() => undefined);

    render(
      <ErrorHandler onError={mockOnError}>
        <Throws />
      </ErrorHandler>,
    );

    expect(screen.getByTestId('ErrorHandler')).toMatchSnapshot();
    expect(mockOnError).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });
});
