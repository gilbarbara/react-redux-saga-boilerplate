import expect from 'expect';
import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { login, logout, clearLocalStorage } from 'sagas/app';
import { ActionTypes } from 'constants/index';

describe('app', () => {
  it('login saga', () => {
    const generator = login();

    expect(generator.next().value).toEqual(call(delay, 1000));
    expect(generator.next().value).toEqual(put({
      type: ActionTypes.USER_LOGIN_SUCCESS
    }));
    expect(generator.next().value).toEqual({
      '@@redux-saga/IO': true,
      PUT: {
        channel: null,
        action: {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'push',
            args: [{ pathname: '/private', search: undefined, state: undefined }]
          }
        }
      }
    });
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('logout saga', () => {
    const generator = logout();

    expect(generator.next().value).toEqual(call(delay, 200));
    expect(generator.next().value).toEqual(put({
      type: ActionTypes.USER_LOGOUT_SUCCESS
    }));
    expect(generator.next().value).toEqual({
      '@@redux-saga/IO': true,
      PUT: {
        channel: null,
        action: {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'push',
            args: [{ pathname: '/', search: undefined, state: undefined }]
          }
        }
      }
    });
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('clearLocalStorage saga', () => {
    const generator = clearLocalStorage();
    expect(generator.next().value).toEqual({ '@@redux-saga/IO': true, CALL: { args: [], context: null, fn: localStorage.clear } });
    expect(generator.next().value).toEqual(put({
      type: ActionTypes.CLEAR_STORAGE_SUCCESS
    }));
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });
});
