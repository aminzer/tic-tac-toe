import { Mark } from '../../constants';
import getMarkClass from './getMarkClass';

const getOutlineMarkClass = (mark?: Mark): string => {
  return getMarkClass(mark, { prefix: 'outline-' });
};

export default getOutlineMarkClass;
