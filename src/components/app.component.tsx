import React, { useState } from 'react';
import { GameRoundStatus } from '../constants';
import {
  getWinCellSequence,
  increaseMatrixSizeBeyondBoundaryCell,
  cloneMatrix,
  invertMark,
} from '../utils';
import Header from './header';
import Board from './board';
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

  const handleBoardCellClick = (rowIndex: number, columnIndex: number): void => {
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

        <Board
          markMatrix={markMatrix}
          gameRoundInfo={gameRoundInfo}
          onCellClick={handleBoardCellClick}
        />
      </div >
    </React.StrictMode>
  );
}

export default AppComponent;
