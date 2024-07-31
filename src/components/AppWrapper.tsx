import React, { ReactNode } from 'react';
import { GlobalStyles, ThemeProvider } from '@app/library';

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default AppWrapper;
