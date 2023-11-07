import React from 'react';
import { Mark } from '../../../../constants';
import { GameRoundInfo } from '../../../../types';
import { isGameRoundFinished } from '../../../../services/game';
import { Button, MarkIcon, Typography } from '../../../../library';
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
