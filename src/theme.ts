import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#11002e',
    },
    primary: {
      main: '#c5a4ff',
      dark: '#4a376a',
    },
    secondary: {
      main: '#00eeff',
    },
  },
  typography: {
    fontFamily: ['Roboto Mono', 'sans-serif'].join(','),
  },
}));

export default theme;
