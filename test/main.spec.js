import main from '../app/scripts/main';

describe('main', () => {
  it('should match the snapshot', () => {
    expect(String(main)).toMatchSnapshot();
  });
});
