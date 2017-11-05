import { ActionTypes } from 'constants/index';

describe('constants', () => {
  it('should match the snapshot', () => {
    expect(ActionTypes).toMatchSnapshot();
  });
});
