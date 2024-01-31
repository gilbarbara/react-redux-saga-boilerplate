import { mergeTheme } from '@gilbarbara/components';

export const headerHeight = 74;

export const appColor = '#00b4d5';

export const easing = 'cubic-bezier(0.35, 0.01, 0.77, 0.34);';

const theme = mergeTheme({
  button: {
    xs: {
      borderRadius: '4px',
    },
    lg: {
      borderRadius: '32px',
      padding: ['14px', '32px'],
    },
  },
});

export const variants = theme.colors;

export default theme;
