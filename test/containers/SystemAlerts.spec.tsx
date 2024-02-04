import React from 'react';
import { config } from 'react-transition-group';
import { act, fireEvent, render, screen } from 'test-utils';

import { alertHide, alertShow } from '~/actions';

import SystemAlerts from '~/containers/SystemAlerts';

config.disabled = true;

vi.mock('~/components/Transition', () => ({
  default: ({ children }) => <div className="transition">{children}</div>,
}));

vi.useFakeTimers();

const mockDispatch = vi.fn();

describe('SystemAlerts', () => {
  it('should render all zones', () => {
    const { container } = render(<SystemAlerts />);

    expect(container).toMatchSnapshot();
  });

  it('should render an alert and hide itself after the timeout', async () => {
    render(<SystemAlerts />, {
      actions: [
        alertShow('Hello World', {
          position: 'top-left',
          type: 'success',
        }),
      ],
      mockDispatch,
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(mockDispatch).toHaveBeenCalledWith(alertHide('8cdee72f-28d4-4441-91f0-c61f6e3d9684'));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should render an alert without timeout and close it', () => {
    render(<SystemAlerts />, {
      actions: [
        alertShow('Hello Mars', {
          id: 'ABD13',
          position: 'bottom-right',
          type: 'neutral',
          timeout: 0,
        }),
      ],
      mockDispatch,
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();

    fireEvent.click(screen.queryByRole('alert')?.querySelector('button')!);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
