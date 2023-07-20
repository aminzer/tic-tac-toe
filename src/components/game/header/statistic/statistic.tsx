import { Mark } from '../../../../constants';
import { GameStatistic } from '../../../../types';
import WinCount from './WinCount';

interface Props {
  gameStatistic: GameStatistic;
}

export default function Statistic({ gameStatistic: { winCount } }: Props) {
  return (
    <>
      <WinCount
        value={winCount[Mark.CROSS]}
        mark={Mark.CROSS}
      />
      x
      <WinCount
        value={winCount[Mark.NOUGHT]}
        mark={Mark.NOUGHT}
      />
    </>
  );
}
