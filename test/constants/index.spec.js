import { ActionTypes, STATUS } from 'constants/index';

describe('constants', () => {
  it('should match the snapshot', () => {
    expect(ActionTypes).toMatchSnapshot();
    expect(STATUS).toMatchSnapshot();
  });
});
