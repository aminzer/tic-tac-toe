import React, { CSSProperties, ReactNode } from 'react';
import { Container } from './styles';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, style }) => {
  return (
    <Container className="btn" type="button" onClick={onClick} style={style}>
      {children}
    </Container>
  );
};

export default Button;
