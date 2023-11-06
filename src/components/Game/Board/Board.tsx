import React, { useState } from 'react';
import { Mark } from '../../../constants';
import { Matrix } from '../../../dataStructures';
import { Cell, GameRoundInfo } from '../../../types';
import { areCellsEqual } from '../../../services/cell';
import { isSequenceContainsCell } from '../../../services/cellSequence';
import { isGameRoundFinished } from '../../../services/game';
import BoardCell from './BoardCell';
import { Container, Spacer, Table } from './styles';

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
    <Container>
      <Spacer>
        <Table>
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
        </Table>
      </Spacer>
    </Container>
  );
};

export default Board;
