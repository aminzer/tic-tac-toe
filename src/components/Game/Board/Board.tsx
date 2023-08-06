import React, { useState } from 'react';
import { Mark } from '../../../constants';
import { Matrix } from '../../../dataStructures';
import { Cell, GameRoundInfo } from '../../../types';
import { areCellsEqual } from '../../../utils/cell';
import { isSequenceContainsCell } from '../../../utils/cellSequence';
import { isGameRoundFinished } from '../../../utils/game';
import BoardCell from './BoardCell';
import './styles.css';

interface BoardProps {
  markMatrix: Matrix<Mark>;
  gameRoundInfo: GameRoundInfo;
  currentPlayerMark: Mark;
  onCellClick: (cell: Cell) => void;
}

const Board: React.FC<BoardProps> = ({
  markMatrix,
  gameRoundInfo,
  currentPlayerMark,
  onCellClick,
}) => {
  const isRoundFinished = isGameRoundFinished(gameRoundInfo);
  const { winCellSequence } = gameRoundInfo;

  const [focusedCell, setFocusedCell] = useState<Cell>(markMatrix.getCentralCell());

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
};

export default Board;
