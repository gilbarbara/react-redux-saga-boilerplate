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
const { dispatch, getState, subscribe } = store;

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
 * Navigate
 * @param {Object} nextState
 * @param {Object} transition
 * @param {function} callback
 *
 * @returns {function}
 */
function navigate(nextState, transition, callback) {
  const pathname = nextState.location.pathname;
  const { user } = getState();

  if (user.logged) {
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

/**
 * Check user status and redirect if not authorized
 * @param {Object} nextState
 * @param {Object} transition
 * @param {function} callback
 *
 */
export function checkStatus(nextState, transition, callback) {
  if (getState().user.rehydrated) {
    navigate(nextState, transition, callback);
    return;
  }

  const unsubscribe = subscribe(() => {
    /* istanbul ignore else  */
    if (getState().user.rehydrated) {
      unsubscribe();
      navigate(nextState, transition, callback);
    }
  });
}
