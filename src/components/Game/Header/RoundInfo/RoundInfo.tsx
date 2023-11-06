import React from 'react';
import { Mark } from '../../../../constants';
import { GameRoundInfo } from '../../../../types';
import { isGameRoundFinished } from '../../../../services/game';
import Button from '../../Button';
import MarkIcon from './MarkIcon';
import { Text } from './styles';

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
        <Text mark={winnerMark}>Winner</Text>

        <MarkIcon mark={winnerMark} />

        <Button onClick={onNewGameRoundStart} style={{ marginLeft: '0.5rem' }}>
          Start new round
        </Button>
      </>
    );
  }

  return (
    <>
      <Text mark={currentMark}>Current turn</Text>

      <MarkIcon mark={currentMark} />
    </>
  );
};

export default RoundInfo;
