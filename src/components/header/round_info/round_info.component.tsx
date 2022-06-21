import { Fragment } from 'react';
import { Mark } from '../../../constants';
import { GameRoundInfo } from '../../../types';
import { isGameRoundFinished, getMarkClass } from '../../../utils';
import Button from '../../button';

interface Props {
  currentMark: Mark;
  gameRoundInfo: GameRoundInfo;
  onNewGameRoundStart: () => void;
}

export default function RoundInfoComponent({ currentMark, gameRoundInfo, onNewGameRoundStart }: Props) {
  if (isGameRoundFinished(gameRoundInfo)) {
    return (
      <Fragment>
        Winner:
        <div className={`current-mark-icon ${getMarkClass(gameRoundInfo.winCellSequence?.mark)}`} />
        <Button onClick={onNewGameRoundStart} style={{ marginLeft: '0.5rem' }}>
          Start new round
        </Button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      Current turn :
      <div className={`current-mark-icon ${getMarkClass(currentMark)}`} />
    </Fragment>
  );
}
