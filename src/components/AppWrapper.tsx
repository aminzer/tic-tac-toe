import React, { ReactNode } from 'react';

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return <React.StrictMode>{children}</React.StrictMode>;
};

export default AppWrapper;
