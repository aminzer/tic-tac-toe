import React from 'react';
import { CellMark, GameRoundStatus } from '../constants';
import { CellMarkMatrix, GameRoundInfo, GameStatistic } from '../types';
import { getWinCellSequence, increaseMatrixSizeBeyondBoundaryCell, createMatrix, cloneMatrix } from '../utils';
import './app.styles.css';

const initialCellMarkMatrix = createMatrix<CellMark>({
  maxRowIndex: 8,
  maxColumnIndex: 10,
});

const initialGameRoundInfo: GameRoundInfo = {
  startingCellMark: CellMark.CROSS,
  status: GameRoundStatus.IN_PROGRESS,
};

const initialGameStatistic: GameStatistic = {
  winCount: {
    [CellMark.CROSS]: 0,
    [CellMark.NOUGHT]: 0,
  }
};

const getCellColorClass = (cellMark?: CellMark): string => {
  return cellMark === CellMark.NOUGHT ? 'bg-nought' : 'bg-cross';
}

const invertCellMark = (cellMark?: CellMark): CellMark => {
  return cellMark === CellMark.NOUGHT ? CellMark.CROSS : CellMark.NOUGHT;
};

function AppComponent() {
  const [cellMarkMatrix, setCellMarkMatrix] = React.useState<CellMarkMatrix>(initialCellMarkMatrix);
  const [currentMark, setCurrentMark] = React.useState<CellMark>(CellMark.CROSS);
  const [gameRoundInfo, setGameRoundInfo] = React.useState<GameRoundInfo>(initialGameRoundInfo);
  const [gameStatistic, setGameStatistic] = React.useState<GameStatistic>(initialGameStatistic);

  const isRoundFinished = gameRoundInfo.status === GameRoundStatus.FINISHED;

  const handleCellClick = (rowIndex: number, columnIndex: number): void => {
    const newCellMarkMatrix = cloneMatrix(cellMarkMatrix);
    newCellMarkMatrix.get(rowIndex).set(columnIndex, currentMark);

    increaseMatrixSizeBeyondBoundaryCell(newCellMarkMatrix, { rowIndex, columnIndex });

    setCellMarkMatrix(newCellMarkMatrix);

    setCurrentMark(invertCellMark(currentMark));

    const winCellSequence = getWinCellSequence(newCellMarkMatrix);

    if (winCellSequence) {
      setGameRoundInfo({
        ...gameRoundInfo,
        status: GameRoundStatus.FINISHED,
        winCellSequence,
      });

      const newGameStatistic = {
        ...gameStatistic,
        winCount: {
          ...gameStatistic.winCount,
          [winCellSequence.cellMark]: gameStatistic.winCount[winCellSequence.cellMark] + 1,
        }
      };

      setGameStatistic(newGameStatistic);
    }
  };

  const handleStartNewRoundButtonClick = () => {
    setCellMarkMatrix(initialCellMarkMatrix);

    const startingCellMark = invertCellMark(gameRoundInfo.startingCellMark);

    setGameRoundInfo({
      ...initialGameRoundInfo,
      startingCellMark,
    });

    setCurrentMark(startingCellMark);
  };

  return (
    <React.StrictMode>
      <div className="content">
        <div className="info-container">
          <div className="info-container-row">
            Score:
            <div className="score-mark-container score-mark-container-cross">
              {gameStatistic.winCount[CellMark.CROSS]}
            </div>
            -
            <div className="score-mark-container score-mark-container-nought">
              {gameStatistic.winCount[CellMark.NOUGHT]}
            </div>
          </div>

          <div className="info-container-row">
            {isRoundFinished ? (
              <React.Fragment>
                Winner:
                <div className={`current-mark-icon ${getCellColorClass(gameRoundInfo.winCellSequence?.cellMark)}`} />
                <button className="btn" style={{ marginLeft: '0.5rem' }} onClick={handleStartNewRoundButtonClick}>Start new round</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                Current turn:
                <div className={`current-mark-icon ${getCellColorClass(currentMark)}`} />
              </React.Fragment>
            )}
          </div>
        </div>

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

                    const cellClassName = `board-cell-mark ${getCellColorClass(mark)}`;

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
      </div >
    </React.StrictMode>
  );
}

export default AppComponent;
