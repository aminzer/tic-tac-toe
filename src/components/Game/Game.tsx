import React, { useEffect, useState } from 'react';
import { GameRoundStatus, Mark } from '@app/constants';
import { getWinCellSequence } from '@app/services/cellSequence';
import { invertMark } from '@app/services/game';
import { Cell } from '@app/types';
import { setTitle } from '@app/utils/document';
import Board from './Board';
import Header from './Header';
import {
  initialGameRoundInfo,
  initialGameStatistic,
  initialMark,
  initialMarkMatrix,
} from './initialData';
import { Content } from './styles';

const Game: React.FC = () => {
  const [markMatrix, setMarkMatrix] = useState(initialMarkMatrix);
  const [currentMark, setCurrentMark] = useState(initialMark);
  const [gameRoundInfo, setGameRoundInfo] = useState(initialGameRoundInfo);
  const [gameStatistic, setGameStatistic] = useState(initialGameStatistic);

  const handleCellMarkSet = ({ rowIndex, columnIndex }: Cell): void => {
    if (markMatrix.get(rowIndex, columnIndex)) {
      return;
    }

    const newMarkMatrix = markMatrix.clone();
    newMarkMatrix.set(rowIndex, columnIndex, currentMark);
    newMarkMatrix.increaseMatrixSizeToIncludeCell({ rowIndex, columnIndex }, { borderOffset: 2 });

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
        onCellMarkSet={handleCellMarkSet}
      />
    </Content>
  );
};

export default Game;
