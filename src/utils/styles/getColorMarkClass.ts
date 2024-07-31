import { Mark } from '@app/constants';
import getMarkClass from './getMarkClass';

const getColorMarkClass = (mark?: Mark): string => {
  return getMarkClass(mark, { prefix: 'color-' });
};

export default getColorMarkClass;
