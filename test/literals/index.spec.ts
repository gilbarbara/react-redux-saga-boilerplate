import { STATUS } from '~/literals';

describe('literals', () => {
  it('should match the snapshot', () => {
    expect(STATUS).toMatchSnapshot();
  });
});
