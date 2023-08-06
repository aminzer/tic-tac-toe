import React from 'react';
import { Mark } from '../../../../../constants';
import { getBackgroundMarkClass } from '../../../../../utils/styles';
import './styles.css';

interface MarkIconProps {
  mark?: Mark;
}

const MarkIcon: React.FC<MarkIconProps> = ({ mark }) => {
  const className = `mark-icon ${getBackgroundMarkClass(mark)}`;

  return (
    <div className={className} />
  );
};

export default MarkIcon;
