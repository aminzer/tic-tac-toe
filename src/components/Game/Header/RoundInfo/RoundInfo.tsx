import React from 'react';
import { Mark } from '../../../../constants';
import { GameRoundInfo } from '../../../../types';
import { isGameRoundFinished } from '../../../../services/game';
import { getColorMarkClass } from '../../../../utils/styles';
import Button from '../../Button';
import MarkIcon from './MarkIcon';
import './styles.css';

interface RoundInfoProps {
  currentMark: Mark;
  gameRoundInfo: GameRoundInfo;
  onNewGameRoundStart: () => void;
}

const RoundInfo: React.FC<RoundInfoProps> = ({
  currentMark,
  gameRoundInfo,
  onNewGameRoundStart,
}) => {
  if (isGameRoundFinished(gameRoundInfo)) {
    const winnerMark = gameRoundInfo.winCellSequence?.mark;

    return (
      <>
        <span className={`text ${getColorMarkClass(winnerMark)}`}>Winner</span>

        <MarkIcon mark={winnerMark} />

        <Button onClick={onNewGameRoundStart} style={{ marginLeft: '0.5rem' }}>
          Start new round
        </Button>
      </>
    );
  }

  return (
    <>
      <span className={`text ${getColorMarkClass(currentMark)}`}>Current turn</span>

      <MarkIcon mark={currentMark} />
    </>
  );
};

export default RoundInfo;
