import { Mark } from '../constants';

export function getMarkClass(mark?: Mark, {
  prefix = '',
}: {
  prefix?: string;
} = {}): string {
  return mark === Mark.NOUGHT ? `${prefix}nought` : `${prefix}cross`;
}

export function getBackgroundMarkClass(mark?: Mark): string {
  return getMarkClass(mark, { prefix: 'bg-' });
}

export function getColorMarkClass(mark?: Mark): string {
  return getMarkClass(mark, { prefix: 'color-' });
}
