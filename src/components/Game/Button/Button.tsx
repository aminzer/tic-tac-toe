import React, { CSSProperties, ReactNode } from 'react';
import './styles.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, style }) => {
  return (
    <button className="btn" type="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
