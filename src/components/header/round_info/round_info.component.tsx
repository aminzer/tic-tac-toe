import { Fragment } from 'react';
import { Mark } from '../../../constants';
import { GameRoundInfo } from '../../../types';
import { isGameRoundFinished } from '../../../utils';
import Button from '../../button';
import MarkIcon from './mark_icon';

interface Props {
  currentMark: Mark;
  gameRoundInfo: GameRoundInfo;
  onNewGameRoundStart: () => void;
}

export default function RoundInfoComponent({ currentMark, gameRoundInfo, onNewGameRoundStart }: Props) {
  if (isGameRoundFinished(gameRoundInfo)) {
    const winnerMark = gameRoundInfo.winCellSequence?.mark

    return (
      <Fragment>
        Winner: <MarkIcon mark={winnerMark} />

        <Button onClick={onNewGameRoundStart} style={{ marginLeft: '0.5rem' }}>
          Start new round
        </Button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      Current turn: <MarkIcon mark={currentMark} />
    </Fragment>
  );
}
