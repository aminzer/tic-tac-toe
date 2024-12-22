import React, { ReactNode } from 'react';
import { HashRouter } from 'react-router';
import { baseUrlPath } from '@app/config/urls';
import { GlobalStyles, ThemeProvider } from '@app/library';

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <HashRouter basename={baseUrlPath}>
        <ThemeProvider>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </HashRouter>
    </React.StrictMode>
  );
};

export default AppWrapper;
