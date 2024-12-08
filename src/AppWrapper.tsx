import React, { ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { GlobalStyles, ThemeProvider } from '@app/library';

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default AppWrapper;
