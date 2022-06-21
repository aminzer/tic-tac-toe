import React from 'react';
import { Mark, GameRoundStatus } from '../constants';
import { MarkMatrix, GameRoundInfo, GameStatistic } from '../types';
import { getWinCellSequence, increaseMatrixSizeBeyondBoundaryCell, createMatrix, cloneMatrix } from '../utils';
import './app.styles.css';

const initialMarkMatrix = createMatrix<Mark>({
  maxRowIndex: 10,
  maxColumnIndex: 10,
});

const initialGameRoundInfo: GameRoundInfo = {
  startingMark: Mark.CROSS,
  status: GameRoundStatus.IN_PROGRESS,
};

const initialGameStatistic: GameStatistic = {
  winCount: {
    [Mark.CROSS]: 0,
    [Mark.NOUGHT]: 0,
  }
};

const getMarkClass = (mark?: Mark): string => {
  return mark === Mark.NOUGHT ? 'bg-nought' : 'bg-cross';
}

const invertMark = (mark: Mark): Mark => {
  return mark === Mark.NOUGHT ? Mark.CROSS : Mark.NOUGHT;
};

function AppComponent() {
  const [markMatrix, setMarkMatrix] = React.useState<MarkMatrix>(initialMarkMatrix);
  const [currentMark, setCurrentMark] = React.useState<Mark>(Mark.CROSS);
  const [gameRoundInfo, setGameRoundInfo] = React.useState<GameRoundInfo>(initialGameRoundInfo);
  const [gameStatistic, setGameStatistic] = React.useState<GameStatistic>(initialGameStatistic);

  const isRoundFinished = gameRoundInfo.status === GameRoundStatus.FINISHED;

  const handleCellClick = (rowIndex: number, columnIndex: number): void => {
    const newMarkMatrix = cloneMatrix(markMatrix);
    newMarkMatrix.get(rowIndex).set(columnIndex, currentMark);

    increaseMatrixSizeBeyondBoundaryCell(newMarkMatrix, { rowIndex, columnIndex });

    setMarkMatrix(newMarkMatrix);

    setCurrentMark(invertMark(currentMark));

    const winCellSequence = getWinCellSequence(newMarkMatrix);

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
          [winCellSequence.mark]: gameStatistic.winCount[winCellSequence.mark] + 1,
        }
      };

      setGameStatistic(newGameStatistic);
    }
  };

  const handleStartNewRoundButtonClick = () => {
    setMarkMatrix(initialMarkMatrix);

    const startingMark = invertMark(gameRoundInfo.startingMark);

    setGameRoundInfo({
      ...initialGameRoundInfo,
      startingMark,
    });

    setCurrentMark(startingMark);
  };

  return (
    <React.StrictMode>
      <div className="content">
        <div className="info-container">
          <div className="info-container-row">
            Score:
            <div className="score-mark-container score-mark-container-cross">
              {gameStatistic.winCount[Mark.CROSS]}
            </div>
            -
            <div className="score-mark-container score-mark-container-nought">
              {gameStatistic.winCount[Mark.NOUGHT]}
            </div>
          </div>

          <div className="info-container-row">
            {isRoundFinished ? (
              <React.Fragment>
                Winner:
                <div className={`current-mark-icon ${getMarkClass(gameRoundInfo.winCellSequence?.mark)}`} />
                <button className="btn" style={{ marginLeft: '0.5rem' }} onClick={handleStartNewRoundButtonClick}>Start new round</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                Current turn:
                <div className={`current-mark-icon ${getMarkClass(currentMark)}`} />
              </React.Fragment>
            )}
          </div>
        </div>

        <div className="board-container">
          <div className="board-spacer">
            <table className="board">
              <tbody>
                {markMatrix.map((row, rowIndex) => (
                  <tr className="board-row" key={rowIndex}>
                    {row.map((mark, columnIndex) => {
                      if (!mark) {
                        return (
                          <td key={columnIndex} className="board-cell" onClick={isRoundFinished ? undefined : () => handleCellClick(rowIndex, columnIndex)}>
                            <button className={`board-cell-button ${isRoundFinished ? '' : 'active'}`} />
                          </td>
                        );
                      }

                      const isWinSequenceCell = gameRoundInfo.winCellSequence?.cells.some(winCell => winCell.rowIndex === rowIndex && winCell.columnIndex === columnIndex);

                      const cellClassName = `board-cell-mark ${getMarkClass(mark)}`;

                      return (
                        <td key={columnIndex} className={`board-cell ${isWinSequenceCell ? `${getMarkClass(gameRoundInfo.winCellSequence?.mark)}-dark` : ''}`}>
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
        </div>
      </div >
    </React.StrictMode>
  );
}

export default AppComponent;
