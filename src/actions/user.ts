/**
 * @module Actions/User
 * @desc User Actions
 */
import { createAction } from 'modules/helpers';

import { ActionTypes } from 'literals';

export const login = createAction(ActionTypes.USER_LOGIN_REQUEST, () => ({}));
export const logOut = createAction(ActionTypes.USER_LOGOUT_REQUEST, () => ({}));
