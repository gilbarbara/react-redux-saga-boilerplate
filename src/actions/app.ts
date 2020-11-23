/**
 * @module Actions/App
 * @desc App Actions
 */
import React from 'react';
import { nanoid } from 'nanoid';

import { createAction } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { ShowAlertOptions } from 'types';

export { go, goBack, push, replace } from 'modules/history';

export const hideAlert = createAction(ActionTypes.HIDE_ALERT, (id: string) => ({ id }));

export const showAlert = createAction(
  ActionTypes.SHOW_ALERT,
  (message: React.ReactNode, options: ShowAlertOptions) => {
    const timeout = options.variant === 'danger' ? 0 : 5;

    return {
      id: options.id || nanoid(),
      icon: options.icon,
      message,
      position: options.position || 'bottom-right',
      variant: options.variant || 'dark',
      timeout: typeof options.timeout === 'number' ? options.timeout : timeout,
    };
  },
);
