import React from 'react';
import { Mark } from '../../../../../constants';
import { getMarkClass } from '../../../../../utils/styles';
import './styles.css';

interface WinCountProps {
  value: number;
  mark: Mark;
}

const WinCount: React.FC<WinCountProps> = ({ value, mark }) => {
  const className = `win-count ${getMarkClass(mark, { prefix: 'win-count-' })}`;

  return <div className={className}>{value}</div>;
};

export default WinCount;
