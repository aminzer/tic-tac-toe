import { Mark } from '../constants';

export function getMarkClass(mark?: Mark, {
  prefix = 'bg-',
}: {
  prefix?: string;
} = {}): string {
  return mark === Mark.NOUGHT ? `${prefix}nought` : `${prefix}cross`;
}
