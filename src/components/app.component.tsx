import React, { useState } from 'react';
import { GameRoundStatus } from '../constants';
import {
  getWinCellSequence,
  increaseMatrixSizeBeyondBoundaryCell,
  cloneMatrix,
  invertMark,
  isGameRoundFinished,
  getMarkClass,
} from '../utils';
import Header from './header';
import {
  initialMark,
  initialMarkMatrix,
  initialGameRoundInfo,
  initialGameStatistic,
} from './initial_data';
import './app.styles.css';

function AppComponent() {
  const [markMatrix, setMarkMatrix] = useState(initialMarkMatrix);
  const [currentMark, setCurrentMark] = useState(initialMark);
  const [gameRoundInfo, setGameRoundInfo] = useState(initialGameRoundInfo);
  const [gameStatistic, setGameStatistic] = useState(initialGameStatistic);

  const isRoundFinished = isGameRoundFinished(gameRoundInfo);

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

  const startNewGameRound = () => {
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
        <Header
          currentMark={currentMark}
          gameRoundInfo={gameRoundInfo}
          gameStatistic={gameStatistic}
          onNewGameRoundStart={startNewGameRound}
        />

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
