import { Mark } from '@app/constants';
import getMarkClass from './getMarkClass';

const getBackgroundMarkClass = (mark?: Mark): string => {
  return getMarkClass(mark, { prefix: 'bg-' });
};

export default getBackgroundMarkClass;
