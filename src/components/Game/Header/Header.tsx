import React from 'react';
import { Mark } from '@app/constants';
import { GameRoundInfo, GameStatistic } from '@app/types';
import RoundInfo from './RoundInfo';
import Statistic from './Statistic';
import { Container, Row } from './styles';

interface HeaderProps {
  currentMark: Mark;
  gameRoundInfo: GameRoundInfo;
  gameStatistic: GameStatistic;
  onNewGameRoundStart: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentMark,
  gameRoundInfo,
  gameStatistic,
  onNewGameRoundStart,
}) => {
  return (
    <Container>
      <Row>
        <Statistic gameStatistic={gameStatistic} />
      </Row>

      <Row>
        <RoundInfo
          currentMark={currentMark}
          gameRoundInfo={gameRoundInfo}
          onNewGameRoundStart={onNewGameRoundStart}
        />
      </Row>
    </Container>
  );
};

export default Header;
