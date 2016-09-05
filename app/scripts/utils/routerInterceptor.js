// @flow

/**
 * Router methods
 * @module routerInterceptor
 */

import scroll from 'scroll';
import scrollDoc from 'scroll-doc';
import ease from 'ease-component';

import { goTo, logOut } from 'actions';
import store from 'store';

const page = scrollDoc();
const { dispatch, getState } = store;

/**
 * Scroll to the top before navigate
 * @param {Object} nextState
 * @param {Object} transition
 * @param {function} callback
 */
export function scrollBefore(nextState, transition, callback) {
  scroll.top(page, 0, { ease: ease.inBounce }, () => {
    callback();
  });
}

/**
 * Check user status and redirect if not authorized
 * @param {Object} nextState
 * @param {Object} transition
 * @param {function} callback
 *
 * @returns {function}
 */
export function checkStatus(nextState, transition, callback) {
  const { app } = getState();
  const pathname = nextState.location.pathname;

  if (app.logged) {
    if (pathname === '/') {
      return dispatch(goTo('/private'));
    }

    return scrollBefore(nextState, transition, callback);
  }

  if (pathname !== '/') {
    return dispatch(logOut());
  }

  return callback();
}
