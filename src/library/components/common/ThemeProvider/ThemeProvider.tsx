import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React, { ReactNode } from 'react';
import { defaultTheme } from '../../../design/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <EmotionThemeProvider theme={defaultTheme}>{children}</EmotionThemeProvider>;
};

export default ThemeProvider;
