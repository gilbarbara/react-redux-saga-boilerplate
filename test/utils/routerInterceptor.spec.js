import expect, { createSpy } from 'expect';

const injector = require('inject!utils/routerInterceptor');

const scroll = {
  top: (page, to, ease, callback) => {
    callback();
  }
};

const dispatch = createSpy();
let getState = createSpy().andReturn({
  user: {
    logged: true
  }
});

describe('routerInterceptor', () => {
  context('with logged user', () => {
    const routerInterceptor = injector({
      scroll,
      store: {
        dispatch,
        getState
      }
    });

    it('checkStatus should redirect to /private', () => {
      routerInterceptor.checkStatus({ location: { pathname: '/' } }, {}, () => {});
      expect(dispatch)
        .toHaveBeenCalledWith({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'push',
            args: [{ pathname: '/private', search: undefined, state: undefined }]
          }
        });
    });

    it('checkStatus should execute callback', () => {
      const callback = createSpy();
      routerInterceptor.checkStatus({ location: { pathname: '/private' } }, {}, callback);

      expect(callback).toHaveBeenCalled();
    });

    it('scrollBefore should execute callback', () => {
      const callback = createSpy();
      routerInterceptor.scrollBefore({}, {}, callback);

      expect(callback).toHaveBeenCalled();
    });
  });

  context('with anon user', () => {
    getState = createSpy().andReturn({
      user: {
        logged: false
      }
    });

    const routerInterceptor = injector({
      scroll,
      store: {
        dispatch,
        getState
      }
    });

    it('checkStatus should dispatch an logout action', () => {
      const callback = createSpy();
      routerInterceptor.checkStatus({ location: { pathname: '/private' } }, {}, callback);

      expect(dispatch).toHaveBeenCalledWith({ type: 'USER_LOGOUT_REQUEST' });
    });

    it('checkStatus should execute callback', () => {
      const callback = createSpy();
      routerInterceptor.checkStatus({ location: { pathname: '/' } }, {}, callback);

      expect(callback).toHaveBeenCalled();
    });
  });
});
