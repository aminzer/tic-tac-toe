import { MarkMatrix, GameRoundInfo } from '../../types';
import { isGameRoundFinished, isSequenceContainsCell } from '../../utils';
import BoardCell from './board_cell';
import './board.styles.css';

interface Props {
  markMatrix: MarkMatrix;
  gameRoundInfo: GameRoundInfo;
  onCellClick: (rowIndex: number, columnIndex: number) => void;
}

export default function BoardComponent({ markMatrix, gameRoundInfo, onCellClick }: Props) {
  const isRoundFinished = isGameRoundFinished(gameRoundInfo);
  const { winCellSequence } = gameRoundInfo;

  return (
    <div className="board-container">
      <div className="board-spacer">
        <table className="board">
          <tbody>
            {markMatrix.map((row, rowIndex) => (
              <tr className="board-row" key={rowIndex}>
                {row.map((mark, columnIndex) => (
                  <BoardCell
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    mark={mark}
                    isDisabled={isRoundFinished}
                    isWinSequenceCell={isSequenceContainsCell(winCellSequence, {
                      rowIndex,
                      columnIndex,
                    })}
                    onCellClick={onCellClick}
                    key={columnIndex}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
