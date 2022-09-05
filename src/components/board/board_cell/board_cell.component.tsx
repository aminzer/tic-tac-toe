import { Mark } from '../../../constants';
import { getBackgroundMarkClass } from '../../../utils';
import './board_cell.styles.css';

interface Props {
  rowIndex: number;
  columnIndex: number;
  mark?: Mark;
  isDisabled: boolean;
  isWinSequenceCell: boolean;
  isTopBorderCell: boolean;
  isBottomBorderCell: boolean;
  isLeftBorderCell: boolean;
  isRightBorderCell: boolean;
  onCellClick: (rowIndex: number, columnIndex: number) => void;
};

export default function BoardCellComponent({
  rowIndex,
  columnIndex,
  mark,
  isDisabled,
  isWinSequenceCell,
  isTopBorderCell,
  isBottomBorderCell,
  isLeftBorderCell,
  isRightBorderCell,
  onCellClick,
}: Props) {
  const boardCellClass = [
    'board-cell',
    isTopBorderCell ? 'board-cell-top' : '',
    isBottomBorderCell ? 'board-cell-bottom' : '',
    isLeftBorderCell ? 'board-cell-left' : '',
    isRightBorderCell ? 'board-cell-right' : '',
  ].join(' ');

  if (mark) {
    const cellClassName = `board-cell-mark ${getBackgroundMarkClass(mark)}`;

    return (
      <td className={`${boardCellClass} ${isWinSequenceCell ? `${getBackgroundMarkClass(mark)}-dark` : ''}`}>
        <button className="board-cell-button">
          <div className={cellClassName} />
        </button>
      </td>
    );
  }

  return (
    <td
      className={boardCellClass}
      onClick={isDisabled ? undefined : () => onCellClick(rowIndex, columnIndex)}
    >
      <button className={`board-cell-button ${isDisabled ? '' : 'active'}`} />
    </td>
  );
}
