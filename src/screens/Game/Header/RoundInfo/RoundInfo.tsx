import React from 'react';
import { Mark } from '@app/constants';
import { Button, MarkIcon, Typography } from '@app/library';
import { isGameRoundFinished } from '@app/services/game';
import { GameRoundInfo } from '@app/types';
import { Container, TextContainer } from './styles';

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
        <TextContainer>
          <Typography color={winnerMark}>Winner</Typography>
        </TextContainer>

        <MarkIcon mark={winnerMark} />

        <Button onClick={onNewGameRoundStart}>Start new round</Button>
      </Container>
    );
  }

  return (
    <Container>
      <TextContainer>
        <Typography color={currentMark}>Current move</Typography>
      </TextContainer>

      <MarkIcon mark={currentMark} />
    </Container>
  );
};

export default RoundInfo;
