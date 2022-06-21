import { Mark } from '../constants';

export function getMarkClass(mark?: Mark): string {
  return mark === Mark.NOUGHT ? 'bg-nought' : 'bg-cross';
}
