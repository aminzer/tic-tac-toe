import styled from '@emotion/styled';
import { Mark } from '../../../../constants';
import { Theme, getMarkColor, ignoreProps } from '../../../../library';

export const Container = styled('td', {
  shouldForwardProp: ignoreProps(
    'mark',
    'isWinSequence',
    'isTopBorder',
    'isBottomBorder',
    'isLeftBorder',
    'isRightBorder',
  ),
})<{
  mark?: Mark;
  isWinSequence: boolean;
  isTopBorder: boolean;
  isBottomBorder: boolean;
  isLeftBorder: boolean;
  isRightBorder: boolean;
}>(({ mark, isWinSequence, isTopBorder, isBottomBorder, isLeftBorder, isRightBorder, theme }) => ({
  height: '2rem',
  width: '2rem',
  border: `1px solid ${theme.palette.background.light}`,

  ...(isWinSequence && {
    backgroundColor: getMarkColor({ mark, type: 'dark', theme }),
  }),

  ...(isTopBorder && { borderTop: 'none' }),
  ...(isBottomBorder && { borderBottom: 'none' }),
  ...(isLeftBorder && { borderLeft: 'none' }),
  ...(isRightBorder && { borderRight: 'none' }),
}));

const getFocusedClickableAreaOutlineColor = ({
  currentPlayerMark,
  isActive,
  theme,
}: {
  currentPlayerMark: Mark;
  isActive: boolean;
  theme: Theme;
}): string => {
  if (!isActive) {
    return theme.palette.primary.default;
  }

  return getMarkColor({ mark: currentPlayerMark, theme });
};

export const ClickableArea = styled('div', {
  shouldForwardProp: ignoreProps('currentPlayerMark', 'isActive', 'isFocused'),
})<{
  currentPlayerMark: Mark;
  isActive: boolean;
  isFocused: boolean;
}>(({ currentPlayerMark, isActive, isFocused, theme }) => ({
  height: '2rem',
  width: '2rem',
  padding: '0.5rem',
  background: 'none',
  border: 'none',
  transition: 'all 0.1s linear',

  ...(isActive &&
    isFocused && {
      cursor: 'pointer',
      backgroundColor: theme.palette.background.light,
    }),

  ...(isFocused && {
    outline: `2px solid ${getFocusedClickableAreaOutlineColor({
      currentPlayerMark,
      isActive,
      theme,
    })}`,
  }),
}));

export const CellMark = styled('div', {
  shouldForwardProp: ignoreProps('mark'),
})<{
  mark?: Mark;
}>(({ mark, theme }) => ({
  height: '100%',
  width: '100%',
  borderRadius: theme.shape.borderRadius.default,
  backgroundColor: getMarkColor({ mark, theme }),
}));
