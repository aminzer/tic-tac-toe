import {
  CYAN_BRIGHT,
  PINK_BRIGHT,
  PINK_DARK,
  // PURPLE_BRIGHT,
  PURPLE_DARK,
  PURPLE_LIGHT,
  YELLOW_BRIGHT,
  YELLOW_DARK,
} from '../palette';
import { Theme } from './types';

const defaultTheme: Theme = {
  palette: {
    primary: {
      default: '#000',
    },
    secondary: {
      default: CYAN_BRIGHT,
    },
    background: {
      default: PURPLE_DARK,
      light: PURPLE_LIGHT,
    },
    marks: {
      cross: {
        default: YELLOW_BRIGHT,
        dark: YELLOW_DARK,
      },
      nought: {
        default: PINK_BRIGHT,
        dark: PINK_DARK,
      },
    },
  },
  fonts: {
    fontFamily: {
      default: 'Roboto Mono',
    },
  },
  shape: {
    borderRadius: {
      default: '20px',
    },
  },
};

export default defaultTheme;
