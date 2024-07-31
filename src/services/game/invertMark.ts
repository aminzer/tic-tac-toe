import { Mark } from '@app/constants';

const invertMark = (mark: Mark): Mark => {
  return mark === Mark.NOUGHT ? Mark.CROSS : Mark.NOUGHT;
};

export default invertMark;
