/**
 * @module Actions/App
 * @desc App Actions
 */

import { push } from 'react-router-redux';

import { ActionTypes } from 'constants/index';

/**
 * Change route path.
 *
 * @function
 * @param {string} pathname
 * @param {Object} [options]
 * @param {string} [options.param]
 * @param {string} [options.query]
 * @param {Object} [options.state]
 *
 * @returns {function}
 */
export function goTo(pathname, options = {}) {
  return push({
    pathname,
    search: options.search,
    state: options.state
  });
}

/**
 * Show a message.
 *
 * @function
 * @param {string} status - Message type: success, warning, error, info.
 * @param {string} message
 * @param {boolean} withTimeout - Should close after a while.
 *
 * @returns {Object}
 */
export function showAlert(status, message, withTimeout = true) {
  return {
    type: ActionTypes.SHOW_ALERT,
    status,
    message,
    withTimeout
  };
}

/**
 * Hide message.
 *
 * @function
 *
 * @returns {Object}
 */
export function hideAlert() {
  return {
    type: ActionTypes.HIDE_ALERT
  };
}

/**
 * Login
 *
 * @function
 *
 * @returns {Object}
 */
export function login() {
  return {
    type: ActionTypes.USER_LOGIN_REQUEST
  };
}

/**
 * Logout
 *
 * @function
 *
 * @returns {Object}
 */
export function logOut() {
  return {
    type: ActionTypes.USER_LOGOUT_REQUEST
  };
}

/**
 * Clean localStorage
 *
 * @function
 *
 * @returns {Object}
 */
export function cleanStorage() {
  return {
    type: ActionTypes.CLEAR_STORAGE_REQUEST
  };
}
