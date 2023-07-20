import { Mark } from '../../../../../constants';
import { getBackgroundMarkClass } from '../../../../../utils';
import './styles.css';

interface Props {
  mark?: Mark;
}

export default function MarkIcon({ mark }: Props) {
  const className = `mark-icon ${getBackgroundMarkClass(mark)}`;

  return (
    <div className={className} />
  );
}