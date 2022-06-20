import React from 'react';
import { CellMark, GameRoundStatus } from '../constants';
import { CellMarkMatrix, GameRoundInfo } from '../interfaces';
import { getWinCellSequence, increaseMatrixSizeBeyondBoundaryCell, createMatrix, cloneMatrix } from '../utils';
import './app.styles.css';

const initialCellMarkMatrix = createMatrix<CellMark>({
  maxRowIndex: 8,
  maxColumnIndex: 10,
});

function AppComponent() {
  const [cellMarkMatrix, setCellMarkMatrix] = React.useState<CellMarkMatrix>(initialCellMarkMatrix);
  const [currentMark, setCurrentMark] = React.useState<CellMark>(CellMark.CROSS);
  const [gameRoundInfo, setGameRoundInfo] = React.useState<GameRoundInfo>({
    status: GameRoundStatus.IN_PROGRESS,
  });

  const isRoundFinished = gameRoundInfo.status === GameRoundStatus.FINISHED;

  const handleCellClick = (rowIndex: number, columnIndex: number): void => {
    const newCellMarkMatrix = cloneMatrix(cellMarkMatrix);
    newCellMarkMatrix.get(rowIndex).set(columnIndex, currentMark);

    increaseMatrixSizeBeyondBoundaryCell(newCellMarkMatrix, { rowIndex, columnIndex });

    setCellMarkMatrix(newCellMarkMatrix);

    setCurrentMark(currentMark === CellMark.CROSS ? CellMark.NOUGHT : CellMark.CROSS);

    const winCellSequence = getWinCellSequence(newCellMarkMatrix);

    setGameRoundInfo({
      status: winCellSequence ? GameRoundStatus.FINISHED : GameRoundStatus.IN_PROGRESS,
      winCellSequence,
    });
  };

  return (
    <React.StrictMode>
      <div className="content">
        <div className="board-container">
          <table className="board">
            <tbody>
              {cellMarkMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((mark, columnIndex) => {
                    if (!mark) {
                      return (
                        <td key={columnIndex} className="board-cell" onClick={isRoundFinished ? undefined : () => handleCellClick(rowIndex, columnIndex)}>
                          <button className={`board-cell-button ${isRoundFinished ? '' : 'active'}`} />
                        </td>
                      );
                    }

                    const isWinSequenceCell = gameRoundInfo.winCellSequence?.cells.some(winCell => winCell.rowIndex === rowIndex && winCell.columnIndex === columnIndex);

                    let cellClassName = 'board-cell-mark';

                    if (mark === CellMark.CROSS) {
                      cellClassName += ' bg-cross';
                    } else if (mark === CellMark.NOUGHT) {
                      cellClassName += ' bg-nought';
                    }

                    return (
                      <td key={columnIndex} className={`board-cell ${isWinSequenceCell ? 'bg-win' : ''}`}>
                        <button className="board-cell-button">
                          <div className={cellClassName} />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-container">
          {isRoundFinished ? (
            <React.Fragment>
              Winner:
              <div className={`current-mark-icon ${gameRoundInfo.winCellSequence?.cellMark === CellMark.CROSS ? 'bg-cross' : 'bg-nought'}`}></div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              Current turn:
              <div className={`current-mark-icon ${currentMark === CellMark.CROSS ? 'bg-cross' : 'bg-nought'}`}></div>
            </React.Fragment>
          )}
        </div>
      </div >
    </React.StrictMode>
  );
}

export default AppComponent;
