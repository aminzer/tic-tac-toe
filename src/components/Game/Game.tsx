import React, { useState, useEffect } from 'react';
import { GameRoundStatus, Mark } from '../../constants';
import { Cell } from '../../types';
import { getWinCellSequence } from '../../services/cellSequence';
import { invertMark } from '../../services/game';
import { setTitle } from '../../utils/document';
import Header from './Header';
import Board from './Board';
import {
  initialMark,
  initialMarkMatrix,
  initialGameRoundInfo,
  initialGameStatistic,
} from './initialData';
import { Content } from './styles';

const Game: React.FC = () => {
  const [markMatrix, setMarkMatrix] = useState(initialMarkMatrix);
  const [currentMark, setCurrentMark] = useState(initialMark);
  const [gameRoundInfo, setGameRoundInfo] = useState(initialGameRoundInfo);
  const [gameStatistic, setGameStatistic] = useState(initialGameStatistic);

  const handleBoardCellClick = ({ rowIndex, columnIndex }: Cell): void => {
    const newMarkMatrix = markMatrix.clone();
    newMarkMatrix.set(rowIndex, columnIndex, currentMark);
    newMarkMatrix.increaseMatrixSizeToIncludeCell({ rowIndex, columnIndex }, { borderOffset: 1 });

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
    <Content>
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
    </Content>
  );
};

export default Game;
