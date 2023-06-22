import { Mark } from '../../../../../constants';
import { getMarkClass } from '../../../../../utils';
import './win_count.styles.css';

interface Props {
  value: number;
  mark: Mark;
}

export default function WinCount({ value, mark }: Props) {
  const className = `win-count ${getMarkClass(mark, { prefix: 'win-count-' })}`;

  return (
    <div className={className}>
      {value}
    </div>
  );
}
