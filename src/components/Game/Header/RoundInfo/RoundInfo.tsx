import React from 'react';
import { Mark } from '../../../../constants';
import { GameRoundInfo } from '../../../../types';
import { isGameRoundFinished } from '../../../../services/game';
import { Button, MarkIcon } from '../../../../library';
import { Container, Text } from './styles';

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
      <Container>
        <Text mark={winnerMark}>Winner</Text>

        <MarkIcon mark={winnerMark} />

        <Button onClick={onNewGameRoundStart}>Start new round</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Text mark={currentMark}>Current move</Text>

      <MarkIcon mark={currentMark} />
    </Container>
  );
};

export default RoundInfo;
