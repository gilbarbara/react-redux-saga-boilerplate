import expect from 'expect';
import { ActionTypes } from 'constants/index';

describe('CONSTANTS', () => {
  it('should have "USER_LOGIN_REQUEST"', () => {
    expect(ActionTypes.USER_LOGIN_REQUEST).toEqual('USER_LOGIN_REQUEST');
  });

  it('should have "USER_LOGIN_SUCCESS"', () => {
    expect(ActionTypes.USER_LOGIN_SUCCESS).toEqual('USER_LOGIN_SUCCESS');
  });

  it('should have "USER_LOGIN_FAILURE"', () => {
    expect(ActionTypes.USER_LOGIN_FAILURE).toEqual('USER_LOGIN_FAILURE');
  });

  it('should have "USER_LOGOUT_REQUEST"', () => {
    expect(ActionTypes.USER_LOGOUT_REQUEST).toEqual('USER_LOGOUT_REQUEST');
  });

  it('should have "USER_LOGOUT_SUCCESS"', () => {
    expect(ActionTypes.USER_LOGOUT_SUCCESS).toEqual('USER_LOGOUT_SUCCESS');
  });

  it('should have "USER_LOGOUT_FAILURE"', () => {
    expect(ActionTypes.USER_LOGOUT_FAILURE).toEqual('USER_LOGOUT_FAILURE');
  });

  it('should have "CLEAR_STORAGE_REQUEST"', () => {
    expect(ActionTypes.CLEAR_STORAGE_REQUEST).toEqual('CLEAR_STORAGE_REQUEST');
  });

  it('should have "CLEAR_STORAGE_SUCCESS"', () => {
    expect(ActionTypes.CLEAR_STORAGE_SUCCESS).toEqual('CLEAR_STORAGE_SUCCESS');
  });

  it('should have "CLEAR_STORAGE_FAILURE"', () => {
    expect(ActionTypes.CLEAR_STORAGE_FAILURE).toEqual('CLEAR_STORAGE_FAILURE');
  });

  it('should have "SHOW_ALERT"', () => {
    expect(ActionTypes.SHOW_ALERT).toEqual('SHOW_ALERT');
  });

  it('should have "HIDE_ALERT"', () => {
    expect(ActionTypes.HIDE_ALERT).toEqual('HIDE_ALERT');
  });
});
