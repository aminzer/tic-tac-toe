import React from 'react';
import { Mark } from '@app/constants';
import { Container } from './styles';

interface MarkIconProps {
  mark?: Mark;
}

const MarkIcon: React.FC<MarkIconProps> = ({ mark }) => {
  return <Container mark={mark} />;
};

export default MarkIcon;
