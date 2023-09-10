import { Theme } from './types';

const theme: Theme = {
  palette: {
    primary: {
      default: '#c5a4ff',
    },
    background: {
      default: '#11002e',
      light: '#4a376a',
    },
    marks: {
      cross: {
        default: '#eeff00',
        dark: '#5c6200',
      },
      nought: {
        default: '#ff006f',
        dark: '#62002b',
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

export default theme;
