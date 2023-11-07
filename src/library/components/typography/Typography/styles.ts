import styled from '@emotion/styled';
import { Mark } from '../../../../constants';
import { ignoreProps } from '../../../helpers';
import { Theme } from '../../../design';
import {
  TypographyColor,
  TypographyTextAlign,
  TypographyVariant,
  TypographyWhiteSpace,
} from './types';

const getTypographyColor = ({
  color,
  theme,
}: {
  color?: TypographyColor;
  theme: Theme;
}): string => {
  switch (color) {
    case 'cross':
    case Mark.CROSS:
      return theme.palette.marks.cross.default;

    case 'nought':
    case Mark.NOUGHT:
      return theme.palette.marks.nought.default;

    default:
      return theme.palette.primary.default;
  }
};

export const Container = styled('span', {
  shouldForwardProp: ignoreProps('variant', 'color', 'textAlign', 'whiteSpace'),
})<{
  variant?: TypographyVariant;
  color?: TypographyColor;
  textAlign?: TypographyTextAlign;
  whiteSpace?: TypographyWhiteSpace;
}>(({ variant, color, textAlign, whiteSpace, theme }) => ({
  textAlign,
  whiteSpace,
  color: getTypographyColor({ color, theme }),

  ...(variant === 'body' && {
    fontSize: '1rem',
    fontWeight: 400,
  }),

  ...(variant === 'h2' && {
    fontSize: '1.5rem',
    fontWeight: 500,
  }),
}));
