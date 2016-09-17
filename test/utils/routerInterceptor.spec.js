let logged = true;
let rehydrated = true;

const mockDispatch = jest.fn();
const mockUnsubscribe = jest.fn();
const mockSubscribe = jest.fn(() => mockUnsubscribe);
const mockGetState = jest.fn(() =>
  ({
    user: {
      logged,
      rehydrated
    }
  })
);
jest.mock('store', () =>
  ({
    dispatch: mockDispatch,
    getState: mockGetState,
    subscribe: mockSubscribe
  })
);

const mockScroll = jest.fn((page, to, ease, cb) => {
  cb();
});
jest.mock('scroll', () =>
  ({
    top: mockScroll
  })
);

const mockCallback = jest.fn();

const routerInterceptor = require('utils/routerInterceptor');

describe('routerInterceptor with logged user', () => {
  it('checkStatus should redirect to /private', () => {
    routerInterceptor.checkStatus({ location: { pathname: '/' } }, {}, () => {
    });

    expect(mockDispatch.mock.calls[0][0]).toMatchSnapshot();
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

    routerInterceptor.checkStatus({ location: { pathname: '/private' } }, {}, () => {
    });
    expect(mockDispatch.mock.calls[1][0]).toMatchSnapshot();
  });

  it('checkStatus should execute callback', () => {
    logged = false;

    routerInterceptor.checkStatus({ location: { pathname: '/' } }, {}, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(3);
  });
});

describe('routerInterceptor with subscribe', () => {
  it('checkStatus should subscribe to the store', () => {
    rehydrated = false;
    routerInterceptor.checkStatus({ location: { pathname: '/' } }, {}, mockCallback);
    expect(mockSubscribe.mock.calls.length).toBe(1);

    rehydrated = true;
    mockSubscribe.mock.calls[0][0]();
    expect(mockUnsubscribe.mock.calls.length).toBe(1);
  });
});
