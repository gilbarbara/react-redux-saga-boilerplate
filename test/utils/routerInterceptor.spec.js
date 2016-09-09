let logged = true;

const mockDispatch = jest.fn();
const mockGetState = jest.fn(() =>
  ({
    user: {
      logged
    }
  })
);
const mockCallback = jest.fn();

const mockScroll = jest.fn((page, to, ease, cb) => {
  cb();
});

jest.mock('store', () =>
  ({
    dispatch: mockDispatch,
    getState: mockGetState
  })
);

jest.mock('scroll', () =>
  ({
    top: mockScroll
  })
);

const routerInterceptor = require('utils/routerInterceptor');

describe('routerInterceptor with logged user', () => {
  it('checkStatus should redirect to /private', () => {
    routerInterceptor.checkStatus({ location: { pathname: '/' } }, {}, () => {});

    expect(mockDispatch.mock.calls[0][0])
      .toEqual({
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          method: 'push',
          args: [{ pathname: '/private', search: undefined, state: undefined }]
        }
      });
  });

  it('checkStatus should execute callback', () => {
    routerInterceptor.checkStatus({ location: { pathname: '/private' } }, {}, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('scrollBefore should execute callback', () => {
    routerInterceptor.scrollBefore({}, {}, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(2);
  });
});

describe('routerInterceptor with anon user', () => {
  it('checkStatus should dispatch an logout action', () => {
    logged = false;

    routerInterceptor.checkStatus({ location: { pathname: '/private' } }, {}, () => {});
    expect(mockDispatch.mock.calls[1][0]).toEqual({ type: 'USER_LOGOUT_REQUEST' });
  });

  it('checkStatus should execute callback', () => {
    logged = false;

    routerInterceptor.checkStatus({ location: { pathname: '/' } }, {}, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(3);
  });
});

