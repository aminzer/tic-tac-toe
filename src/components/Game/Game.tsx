import React, { useState, useEffect } from 'react';
import { GameRoundStatus, Mark } from '../../constants';
import {
  getWinCellSequence,
  increaseMatrixSizeBeyondBoundaryCell,
  invertMark,
  setTitle,
} from '../../utils';
import { Cell } from '../../types';
import Header from './Header';
import Board from './Board';
import {
  initialMark,
  initialMarkMatrix,
  initialGameRoundInfo,
  initialGameStatistic,
} from './initialData';
import './styles.css';

const Game: React.FC = () => {
  const [markMatrix, setMarkMatrix] = useState(initialMarkMatrix);
  const [currentMark, setCurrentMark] = useState(initialMark);
  const [gameRoundInfo, setGameRoundInfo] = useState(initialGameRoundInfo);
  const [gameStatistic, setGameStatistic] = useState(initialGameStatistic);

  const handleBoardCellClick = ({ rowIndex, columnIndex }: Cell): void => {
    const newMarkMatrix = markMatrix.clone();
    newMarkMatrix.set(rowIndex, columnIndex, currentMark);

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
        },
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

  useEffect(() => {
    const { winCount } = gameStatistic;
    const crossWinCount = winCount[Mark.CROSS];
    const noughtWinCount = winCount[Mark.NOUGHT];

    setTitle(`${crossWinCount}:${noughtWinCount}`);
  }, [gameStatistic]);

  return (
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
        currentPlayerMark={currentMark}
        onCellClick={handleBoardCellClick}
      />
    </div>
  );
};

export default Game;
