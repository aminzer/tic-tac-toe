import { CellSequence } from '@app/types';

const getCellSequenceLength = (cellSequence?: CellSequence | null): number => {
  return cellSequence?.cells?.length ?? 0;
};

export default getCellSequenceLength;
