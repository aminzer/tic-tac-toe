import { useState } from 'react';
import { Mark } from '../../../constants';
import { Matrix } from '../../../data_structures';
import { Cell, GameRoundInfo } from '../../../types';
import {
  areCellsEqual,
  getCentralCell,
  isGameRoundFinished,
  isSequenceContainsCell,
} from '../../../utils';
import BoardCell from './board_cell';
import './board.styles.css';

interface Props {
  markMatrix: Matrix<Mark>;
  gameRoundInfo: GameRoundInfo;
  currentPlayerMark: Mark;
  onCellClick: (cell: Cell) => void;
}

export default function BoardComponent({
  markMatrix,
  gameRoundInfo,
  currentPlayerMark,
  onCellClick,
}: Props) {
  const isRoundFinished = isGameRoundFinished(gameRoundInfo);
  const { winCellSequence } = gameRoundInfo;

  const [focusedCell, setFocusedCell] = useState<Cell>(getCentralCell(markMatrix));

  return (
    <div className="board-container">
      <div className="board-spacer">
        <table className="board">
          <tbody>
            {markMatrix.mapRows((row) => (
              <tr key={row.index}>
                {row.mapColumns((cell) => {
                  const { rowIndex, columnIndex } = cell;
                  const mark = markMatrix.get(rowIndex, columnIndex);

                  return (
                    <BoardCell
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      mark={mark}
                      currentPlayerMark={currentPlayerMark}
                      isActive={!isRoundFinished && !mark}
                      isFocused={!isRoundFinished && areCellsEqual(focusedCell, cell)}
                      isWinSequence={isSequenceContainsCell(winCellSequence, {
                        rowIndex,
                        columnIndex,
                      })}
                      isTopBorder={rowIndex === markMatrix.minRowIndex}
                      isBottomBorder={rowIndex === markMatrix.maxRowIndex}
                      isLeftBorder={columnIndex === markMatrix.minColumnIndex}
                      isRightBorder={columnIndex === markMatrix.maxColumnIndex}
                      onClick={onCellClick}
                      onFocus={setFocusedCell}
                      key={columnIndex}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
