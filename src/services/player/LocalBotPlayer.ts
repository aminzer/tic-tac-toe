import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { Cell } from '@app/types';
import { getBestCell } from './botStrategy';
import { Player } from './types';

class LocalBotPlayer implements Player {
  private readonly mark: Mark;

  constructor({ mark }: { mark: Mark }) {
    this.mark = mark;
  }

  public getMark(): Mark {
    return this.mark;
  }

  public async getNextCellToMark(markMatrix: Matrix<Mark>): Promise<Cell> {
    return getBestCell(markMatrix, this.mark);
  }
}

export default LocalBotPlayer;
