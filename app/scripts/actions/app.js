// @flow
/**
 * @module Actions/App
 * @desc App Actions
 */

import uuid from 'uuid/v4';
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export { goBack, goForward, push, replace } from 'connected-react-router';

export const {
  hideAlert,
  showAlert,
  switchMenu,
} = createActions({
  [ActionTypes.SWITCH_MENU]: (query: string) => ({ query }),
  [ActionTypes.HIDE_ALERT]: (id: string) => ({ id }),
  [ActionTypes.SHOW_ALERT]: (message: string, options: Object) => {
    const timeout = options.type === 'error' ? 0 : 5;

    return {
      id: options.id || uuid(),
      icon: options.icon,
      message,
      position: options.position || 'bottom-right',
      type: options.type,
      timeout: !isNaN(options.timeout) ? options.timeout : timeout,
    };
  },
});
