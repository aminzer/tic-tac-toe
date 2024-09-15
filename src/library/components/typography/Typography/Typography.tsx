import React, { ReactNode } from 'react';
import { Container } from './styles';
import {
  TypographyColor,
  TypographyTextAlign,
  TypographyVariant,
  TypographyWhiteSpace,
} from './types';

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  textAlign?: TypographyTextAlign;
  whiteSpace?: TypographyWhiteSpace;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'default',
  textAlign,
  whiteSpace,
}) => {
  return (
    <Container variant={variant} color={color} textAlign={textAlign} whiteSpace={whiteSpace}>
      {children}
    </Container>
  );
};

export default Typography;
