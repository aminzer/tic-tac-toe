import { Mark } from '@app/constants';
import { Cell } from '@app/types';
import { Player } from './types';

class LocalHumanPlayer implements Player {
  private readonly mark: Mark;

  private resolveNextCell: ((cell: Cell) => void) | null = null;

  constructor({ mark }: { mark: Mark }) {
    this.mark = mark;
  }

  public getMark(): Mark {
    return this.mark;
  }

  public async getNextCellToMark(): Promise<Cell> {
    return new Promise<Cell>((resolve) => {
      this.resolveNextCell = resolve;
    });
  }

  public resolveNextCellToMark(cell: Cell): void {
    if (!this.resolveNextCell) {
      return;
    }

    this.resolveNextCell(cell);
    this.resolveNextCell = null;
  }
}

export default LocalHumanPlayer;
