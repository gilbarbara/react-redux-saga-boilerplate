import React from 'react';
import App from 'Root';

import { ActionTypes } from 'literals';

import { render, screen } from 'test-utils';

const mockDispatch = jest.fn();

describe('Root', () => {
  afterEach(() => {
    mockDispatch.mockClear();
  });

  it('should render properly for anonymous users', () => {
    render(<App />, { mockDispatch });
    expect(screen.getByTestId('app')).toMatchSnapshot();
  });

  it('should render properly for logged users', () => {
    render(<App />, {
      actions: [
        {
          type: ActionTypes.USER_LOGIN_SUCCESS,
          payload: {},
        },
      ],
      mockDispatch,
    });

    expect(screen.getByTestId('app')).toMatchSnapshot();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionTypes.SHOW_ALERT,
      payload: {
        id: 'ABCDEF',
        icon: 'bell',
        message: 'Hello! And welcome!',
        position: 'bottom-right',
        variant: 'success',
        timeout: 10,
      },
    });
  });
});
