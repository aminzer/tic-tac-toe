import React, { ReactNode } from 'react';
import { ButtonContainer, LinkContainer } from './styles';

interface ButtonProps {
  children: ReactNode;
  url?: string;
  autoFocus?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, url, autoFocus, onClick }) => {
  if (url) {
    return <LinkContainer to={url}>{children}</LinkContainer>;
  }

  return (
    <ButtonContainer type="button" autoFocus={autoFocus} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
