import { Mark } from '../../../../constants';
import { GameRoundInfo } from '../../../../types';
import { getColorMarkClass, isGameRoundFinished } from '../../../../utils';
import Button from '../../Button';
import MarkIcon from './MarkIcon';
import './styles.css';

interface Props {
  currentMark: Mark;
  gameRoundInfo: GameRoundInfo;
  onNewGameRoundStart: () => void;
}

export default function RoundInfo({
  currentMark,
  gameRoundInfo,
  onNewGameRoundStart,
}: Props) {
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
}