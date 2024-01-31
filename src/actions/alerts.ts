import { ReactNode } from 'react';
import { uuid } from '@gilbarbara/helpers';
import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from '~/modules/helpers';

import { ActionTypes } from '~/literals';

import { ShowAlertOptions } from '~/types';

export const hideAlert = createAction<string>(ActionTypes.ALERTS_HIDE);

export const showAlert = createAction(
  ActionTypes.ALERTS_SHOW,
  (message: ReactNode, options: ShowAlertOptions) => {
    const timeout = options.type === 'error' ? 0 : 5;

    return actionPayload({
      id: options.id || uuid(),
      icon: options.icon || 'info-o',
      message,
      position: options.position || 'bottom-right',
      type: options.type || 'neutral',
      timeout: typeof options.timeout === 'number' ? options.timeout : timeout,
    });
  },
);
