import React from 'react';
import { Mark } from '@app/constants';
import { Cell } from '@app/types';
import { CellMark, ClickableArea, Container } from './styles';

interface BoardCellProps {
  rowIndex: number;
  columnIndex: number;
  mark?: Mark;
  currentPlayerMark: Mark;
  isActive: boolean;
  isFocused: boolean;
  isWinSequence: boolean;
  isTopBorder: boolean;
  isBottomBorder: boolean;
  isLeftBorder: boolean;
  isRightBorder: boolean;
  onClick: (cell: Cell) => void;
  onFocus: (cell: Cell) => void;
}

const BoardCell: React.FC<BoardCellProps> = ({
  rowIndex,
  columnIndex,
  mark,
  currentPlayerMark,
  isActive,
  isFocused,
  isWinSequence,
  isTopBorder,
  isBottomBorder,
  isLeftBorder,
  isRightBorder,
  onClick,
  onFocus,
}) => {
  const handleClick = () => {
    if (isActive) {
      onClick({ rowIndex, columnIndex });
    }
  };

  return (
    <Container
      mark={mark}
      isWinSequence={isWinSequence}
      isTopBorder={isTopBorder}
      isBottomBorder={isBottomBorder}
      isLeftBorder={isLeftBorder}
      isRightBorder={isRightBorder}
      onClick={handleClick}
      onMouseEnter={() => onFocus({ rowIndex, columnIndex })}
    >
      <ClickableArea
        currentPlayerMark={currentPlayerMark}
        isActive={isActive}
        isFocused={isFocused}
      >
        {mark && <CellMark mark={mark} />}
      </ClickableArea>
    </Container>
  );
};

export default React.memo(BoardCell);
