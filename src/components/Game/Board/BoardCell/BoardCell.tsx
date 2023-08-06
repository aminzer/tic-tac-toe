import React from 'react';
import classNames from 'classnames';
import { Mark } from '../../../../constants';
import { Cell } from '../../../../types';
import { getBackgroundMarkClass, getOutlineMarkClass } from '../../../../utils/styles';
import './styles.css';

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
  const cellClassName = classNames('board-cell', {
    top: isTopBorder,
    bottom: isBottomBorder,
    left: isLeftBorder,
    right: isRightBorder,
    [`${getBackgroundMarkClass(mark)}-dark`]: isWinSequence,
  });

  const cellButtonClassName = classNames('board-cell-button', {
    active: isActive,
    focused: isFocused,
    [getOutlineMarkClass(currentPlayerMark)]: isFocused,
  });

  const cellMarkClassName = classNames('board-cell-mark', getBackgroundMarkClass(mark));

  const handleClick = () => {
    if (isActive) {
      onClick({ rowIndex, columnIndex });
    }
  };

  return (
    <td
      className={cellClassName}
      onClick={handleClick}
      onMouseEnter={() => onFocus({ rowIndex, columnIndex })}
    >
      <button className={cellButtonClassName} type="button">
        {mark && (
          <div className={cellMarkClassName} />
        )}
      </button>
    </td>
  );
};

export default BoardCell;
