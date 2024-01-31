import theme from '~/modules/theme';

describe('modules/theme', () => {
  describe('theme', () => {
    it('should return the theme', () => {
      expect(theme).toMatchSnapshot();
    });
  });
});
