import React, { ReactNode } from 'react';
import { ButtonContainer, LinkContainer } from './styles';

interface ButtonProps {
  children: ReactNode;
  url?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, url, onClick }) => {
  if (url) {
    return <LinkContainer to={url}>{children}</LinkContainer>;
  }

  return (
    <ButtonContainer type="button" onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
