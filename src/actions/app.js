// @flow
/**
 * @module Actions/App
 * @desc App Actions
 */

import uid from 'nanoid';
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export { goBack, go, push, replace } from 'modules/history';

export const { hideAlert, showAlert, switchMenu } = createActions({
  [ActionTypes.SWITCH_MENU]: (query: string) => ({ query }),
  [ActionTypes.HIDE_ALERT]: (id: string) => ({ id }),
  [ActionTypes.SHOW_ALERT]: (message: string, options: Object) => {
    const timeout = options.variant === 'danger' ? 0 : 5;

    return {
      id: options.id || uid(),
      icon: options.icon,
      message,
      position: options.position || 'bottom-right',
      variant: options.variant || 'dark',
      timeout: typeof options.timeout === 'number' ? options.timeout : timeout,
    };
  },
});
