/**
 * @module Actions/App
 * @desc App Actions
 */

import { push } from 'react-router-redux';

import { ActionTypes } from 'constants/index';

/**
 * Change route path.
 *
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
 * @returns {Object}
 */
export function clearStorage() {
  return {
    type: ActionTypes.CLEAR_STORAGE_REQUEST
  };
}
