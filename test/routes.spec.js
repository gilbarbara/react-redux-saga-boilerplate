import createRoutes from 'routes';

describe('routes', () => {
  it('should match the snapshot', () => {
    expect(String(createRoutes)).toMatchSnapshot();
  });
});
