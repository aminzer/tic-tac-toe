import { Mark } from '../../../constants';
import { Matrix } from '../../../data_structures';
import { GameRoundInfo } from '../../../types';
import { isGameRoundFinished, isSequenceContainsCell } from '../../../utils';
import BoardCell from './board_cell';
import './board.styles.css';

interface Props {
  markMatrix: Matrix<Mark>;
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
            {markMatrix.mapRows((row) => (
              <tr key={row.index}>
                {row.mapColumns(({ rowIndex, columnIndex }) => (
                  <BoardCell
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    mark={markMatrix.get(rowIndex, columnIndex)}
                    isDisabled={isRoundFinished}
                    isWinSequenceCell={isSequenceContainsCell(winCellSequence, {
                      rowIndex,
                      columnIndex,
                    })}
                    isTopBorderCell={rowIndex === markMatrix.minRowIndex}
                    isBottomBorderCell={rowIndex === markMatrix.maxRowIndex}
                    isLeftBorderCell={columnIndex === markMatrix.minColumnIndex}
                    isRightBorderCell={columnIndex === markMatrix.maxColumnIndex}
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
