import React from 'react';
import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { ShowAlertOptions } from 'types';

export const hideAlert = createAction<string>(ActionTypes.HIDE_ALERT);

export const showAlert = createAction(
  ActionTypes.SHOW_ALERT,
  (message: React.ReactNode, options: ShowAlertOptions) => {
    const timeout = options.variant === 'danger' ? 0 : 5;

    return actionPayload({
      id: options.id || nanoid(),
      icon: options.icon || 'dot-circle-o',
      message,
      position: options.position || 'bottom-right',
      variant: options.variant || 'dark',
      timeout: typeof options.timeout === 'number' ? options.timeout : timeout,
    });
  },
);
