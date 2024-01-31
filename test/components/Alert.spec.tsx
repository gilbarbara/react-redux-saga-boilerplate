import React, { ReactNode } from 'react';
import { render, screen } from 'test-utils';

import Alert from '~/components/Alert';

import { AlertType } from '~/types';

describe('Alert', () => {
  it('should render the default alert', () => {
    render(<Alert>Basic Alert</Alert>);

    expect(screen.getByRole('alert')).toMatchSnapshot();
  });

  it.each<{ children: ReactNode; type: AlertType }>([
    { type: 'success', children: 'This is a success message' },
    { type: 'error', children: <p key="danger">This is an error message</p> },
    { type: 'warning', children: 'This is a warning message' },
    { type: 'info', children: 'This is an info message' },
    { type: 'neutral', children: <div key="dark">This is a message</div> },
  ])('should render the $type type', ({ children, type }) => {
    render(<Alert type={type}>{children}</Alert>);

    expect(screen.getByRole('alert')).toMatchSnapshot();
  });
});
