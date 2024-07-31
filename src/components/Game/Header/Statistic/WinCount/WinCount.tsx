import React from 'react';
import { Mark } from '@app/constants';
import { Container } from './styles';

interface WinCountProps {
  value: number;
  mark: Mark;
}

const WinCount: React.FC<WinCountProps> = ({ value, mark }) => {
  return <Container mark={mark}>{value}</Container>;
};

export default WinCount;
