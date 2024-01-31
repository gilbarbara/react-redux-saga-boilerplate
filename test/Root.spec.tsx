import React from 'react';
import { act, render, screen } from 'test-utils';

import { loginSuccess } from '~/actions';
import { ActionTypes } from '~/literals';

import Root from '~/Root';

const mockDispatch = vi.fn();

describe('Root', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render properly for anonymous users', () => {
    render(<Root />, { mockDispatch });
    expect(screen.getByTestId('app')).toMatchSnapshot();
  });

  it('should render properly for logged users', () => {
    const { store } = render(<Root />, {
      mockDispatch,
    });

    act(() => {
      store.dispatch(loginSuccess());
    });

    expect(screen.getByTestId('app')).toMatchSnapshot();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionTypes.ALERTS_SHOW,
      payload: {
        id: '8cdee72f-28d4-4441-91f0-c61f6e3d9684',
        icon: 'bell',
        message: 'Hello! And welcome!',
        position: 'bottom-right',
        type: 'success',
        timeout: 10,
      },
    });
  });
});
