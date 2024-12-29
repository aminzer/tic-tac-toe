import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { Cell } from '@app/types';
import { Player } from './types';

class LocalBotPlayer implements Player {
  private readonly mark: Mark;

  constructor({ mark }: { mark: Mark }) {
    this.mark = mark;
  }

  public getMark(): Mark {
    return this.mark;
  }

  // TODO implement proper algorithm
  public async getNextCellToMark(markMatrix: Matrix<Mark>): Promise<Cell> {
    // TODO try to focus on it's max lines
    // get max sequence from 4 up to 5 that have enough space to win

    // TODO block all 3rds of opponent - unless you have a better line

    // TODO place existing marks

    const { minRowIndex, maxRowIndex, minColumnIndex, maxColumnIndex } = markMatrix;

    for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
      for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
        const mark = markMatrix.get(rowIndex, columnIndex);

        if (!mark) {
          return { rowIndex, columnIndex };
        }
      }
    }

    return { rowIndex: maxRowIndex + 1, columnIndex: maxColumnIndex };
  }
}

export default LocalBotPlayer;
