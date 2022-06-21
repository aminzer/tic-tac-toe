import { Mark } from '../../../constants';
import { getMarkClass } from '../../../utils';
import './board_cell.styles.css';

interface Props {
  rowIndex: number;
  columnIndex: number;
  mark?: Mark;
  isDisabled: boolean;
  isWinSequenceCell: boolean;
  onCellClick: (rowIndex: number, columnIndex: number) => void;
};

export default function BoardCellComponent({
  rowIndex,
  columnIndex,
  mark,
  isDisabled,
  isWinSequenceCell,
  onCellClick,
}: Props) {
  if (mark) {
    const cellClassName = `board-cell-mark ${getMarkClass(mark)}`;

    return (
      <td className={`board-cell ${isWinSequenceCell ? `${getMarkClass(mark)}-dark` : ''}`}>
        <button className="board-cell-button">
          <div className={cellClassName} />
        </button>
      </td>
    );
  }

  return (
    <td
      className="board-cell"
      onClick={isDisabled ? undefined : () => onCellClick(rowIndex, columnIndex)}
    >
      <button className={`board-cell-button ${isDisabled ? '' : 'active'}`} />
    </td>
  );
}
