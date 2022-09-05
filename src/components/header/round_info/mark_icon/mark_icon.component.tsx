import { Mark } from '../../../../constants';
import { getBackgroundMarkClass } from '../../../../utils';
import './mark_icon.styles.css';

interface Props {
  mark?: Mark;
}

export default function MarkIconComponent({ mark }: Props) {
  const className = `mark-icon ${getBackgroundMarkClass(mark)}`;

  return (
    <div className={className} />
  );
}
