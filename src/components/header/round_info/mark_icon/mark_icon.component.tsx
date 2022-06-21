import { Mark } from '../../../../constants';
import { getMarkClass } from '../../../../utils';
import './mark_icon.styles.css';

interface Props {
  mark?: Mark;
}

export default function MarkIconComponent({ mark }: Props) {
  const className = `mark-icon ${getMarkClass(mark)}`;

  return (
    <div className={className} />
  );
}
