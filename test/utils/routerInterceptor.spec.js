import expect, { createSpy } from 'expect';
import { scrollBefore, checkStatus } from 'utils/routerInterceptor';

describe('routerInterceptor', () => {
  it('checkStatus should execute callback', () => {
    const callback = createSpy();
    checkStatus({ location: { pathname: '/' } }, {}, callback);

    expect(callback).toHaveBeenCalled();
  });

  it('scrollBefore should execute callback', () => {
    const callback = createSpy();
    scrollBefore({}, {}, callback);

    expect(callback).toHaveBeenCalled();
  });
});
