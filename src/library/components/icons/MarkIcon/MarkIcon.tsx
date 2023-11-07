import React from 'react';
import { Mark } from '../../../../constants';
import { Container } from './styles';

interface MarkIconProps {
  mark?: Mark;
}

const MarkIcon: React.FC<MarkIconProps> = ({ mark }) => {
  return <Container mark={mark} />;
};

export default MarkIcon;
