import { useMemo } from 'react';
import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import getViewportDimensions from '@app/utils/document/getViewportDimensions';
import { boardCellSizePx } from '../Board/styles';
import { getInitialBoardMatrixSizes } from '../helpers';

const useInitialMarkMatrix = (): Matrix<Mark> => {
  return useMemo(() => {
    const viewportDimensions = getViewportDimensions();

    const initialBoardMatrixSizes = getInitialBoardMatrixSizes({
      viewportDimensions,
      boardCellSizePx,
    });

    return new Matrix<Mark>(initialBoardMatrixSizes);
  }, []);
};

export default useInitialMarkMatrix;
