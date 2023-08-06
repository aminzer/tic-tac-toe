import { Mark } from '../../constants';

const getMarkClass = (mark?: Mark, {
  prefix = '',
}: {
  prefix?: string;
} = {}): string => {
  return mark === Mark.NOUGHT ? `${prefix}nought` : `${prefix}cross`;
};

export default getMarkClass;
