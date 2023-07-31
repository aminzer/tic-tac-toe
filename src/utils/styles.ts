import { Mark } from '../constants';

export const getMarkClass = (mark?: Mark, {
  prefix = '',
}: {
  prefix?: string;
} = {}): string => {
  return mark === Mark.NOUGHT ? `${prefix}nought` : `${prefix}cross`;
};

export const getBackgroundMarkClass = (mark?: Mark): string => {
  return getMarkClass(mark, { prefix: 'bg-' });
};

export const getColorMarkClass = (mark?: Mark): string => {
  return getMarkClass(mark, { prefix: 'color-' });
};

export const getOutlineMarkClass = (mark?: Mark): string => {
  return getMarkClass(mark, { prefix: 'outline-' });
};
