import React, { useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { Mark } from '../../../constants';
import { Matrix } from '../../../dataStructures';
import { Cell, GameRoundInfo } from '../../../types';
import { getNewFocusedCell } from '../../../services/board';
import { areCellsEqual } from '../../../services/cell';
import { isSequenceContainsCell } from '../../../services/cellSequence';
import { isGameRoundFinished } from '../../../services/game';
import { handleCellMarkSet, handleFocusedCellChange } from '../../../services/keyboard';
import BoardCell from './BoardCell';
import { Container, Spacer, Table } from './styles';

interface BoardProps {
  markMatrix: Matrix<Mark>;
  gameRoundInfo: GameRoundInfo;
  currentPlayerMark: Mark;
  onCellMarkSet: (cell: Cell) => void;
}

const Board: React.FC<BoardProps> = ({
  markMatrix,
  gameRoundInfo,
  currentPlayerMark,
  onCellMarkSet,
}) => {
  const isRoundFinished = isGameRoundFinished(gameRoundInfo);
  const { winCellSequence } = gameRoundInfo;

  const [focusedCell, setFocusedCell] = useState<Cell>(markMatrix.getCentralCell());

  useEventListener('keydown', (event): void => {
    if (isRoundFinished) {
      return;
    }

    handleFocusedCellChange(event, currentPlayerMark, (focusedCellChange) => {
      setFocusedCell((prevFocusedCell) =>
        getNewFocusedCell({ prevFocusedCell, focusedCellChange, boardLimits: markMatrix }),
      );
    });

    handleCellMarkSet(event, currentPlayerMark, () => {
      onCellMarkSet(focusedCell);
    });
  });

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
                      onClick={onCellMarkSet}
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
