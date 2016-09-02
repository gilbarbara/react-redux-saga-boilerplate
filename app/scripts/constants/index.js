import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  USER_LOGIN_REQUEST: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_LOGOUT_REQUEST: undefined,
  USER_LOGOUT_SUCCESS: undefined,
  USER_LOGOUT_FAILURE: undefined,
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
  CLEAR_STORAGE_REQUEST: undefined,
  CLEAR_STORAGE_SUCCESS: undefined,
  CLEAR_STORAGE_FAILURE: undefined
});

/**
 * @constant {Object} XHR
 * @memberof Constants
 */
export const XHR = keyMirror({
  SUCCESS: undefined,
  FAIL: undefined
});
