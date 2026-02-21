import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Mark } from '@app/constants';
import { GameService } from '@app/services/game';
import findCurrentPlayer from '@app/services/game/findCurrentPlayer';
import { Player } from '@app/services/player';
import { Cell } from '@app/types';
import { setTitle } from '@app/utils/document';
import Board from './Board';
import Header from './Header';
import { useInitialMarkMatrix } from './hooks';
import { initialGameRoundInfo, initialGameStatistic, initialMark } from './initialData';
import { Content } from './styles';

interface GameProps {
  players: Player[];
}

const Game: React.FC<GameProps> = ({ players }) => {
  const initialMarkMatrix = useInitialMarkMatrix();
  const [markMatrix, setMarkMatrix] = useState(initialMarkMatrix);
  const [currentMark, setCurrentMark] = useState(initialMark);
  const [gameRoundInfo, setGameRoundInfo] = useState(initialGameRoundInfo);
  const [gameStatistic, setGameStatistic] = useState(initialGameStatistic);

  const gameService = useMemo(() => new GameService({ players }), [players]);

  const handleCellMarkSet = useCallback(
    (cell: Cell): void => {
      const currentPlayer = findCurrentPlayer(players, currentMark);

      if (currentPlayer?.resolveNextCellToMark) {
        currentPlayer.resolveNextCellToMark(cell);
      }
    },
    [players, currentMark],
  );

  const startNewGameRound = () => {
    gameService.startNewRound();

    setMarkMatrix(gameService.getMarkMatrix().clone());
    setCurrentMark(gameService.getCurrentMark());
    setGameRoundInfo(structuredClone(gameService.getRoundInfo()));
  };

  useEffect(() => {
    gameService.onCellMarkSet(() => {
      setMarkMatrix(gameService.getMarkMatrix().clone());
      setCurrentMark(gameService.getCurrentMark());
    });

    gameService.onRoundFinish(() => {
      setGameRoundInfo(structuredClone(gameService.getRoundInfo()));
      setGameStatistic(structuredClone(gameService.getStatistic()));
    });

    gameService.startNewRound();
  }, [gameService]);

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
