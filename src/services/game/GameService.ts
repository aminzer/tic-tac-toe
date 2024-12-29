import { GameRoundStatus, Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { Cell, CellSequence, GameRoundInfo, GameStatistic } from '@app/types';
import { removeArrayElement } from '@app/utils/array';
import { getWinCellSequence } from '../cellSequence';
import { Player } from '../player';
import findCurrentPlayer from './findCurrentPlayer';
import { GameServiceException } from './GameServiceException';
import invertMark from './invertMark';

class GameService {
  private _players: Player[];

  private _initialBoardMatrixSizes: { maxRowIndex: number; maxColumnIndex: number };

  private _markMatrix: Matrix<Mark> = new Matrix();

  private _currentMark: Mark = Mark.CROSS;

  private _roundInfo: GameRoundInfo = {
    startingMark: Mark.CROSS,
    status: GameRoundStatus.NOT_STARTED,
  };

  private _statistic: GameStatistic = { winCount: { [Mark.CROSS]: 0, [Mark.NOUGHT]: 0 } };

  private _cellMarkSetSubscribers: (() => void)[] = [];

  private _roundFinishSubscribers: (() => void)[] = [];

  public constructor({
    players,
    initialBoardMatrixSizes = { maxRowIndex: 10, maxColumnIndex: 10 },
  }: {
    players: Player[];
    initialBoardMatrixSizes?: { maxRowIndex: number; maxColumnIndex: number };
  }) {
    this._players = players;
    this._initialBoardMatrixSizes = initialBoardMatrixSizes;
  }

  public getMarkMatrix(): Matrix<Mark> {
    return this._markMatrix;
  }

  public getCurrentMark(): Mark {
    return this._currentMark;
  }

  public getRoundInfo(): GameRoundInfo {
    return this._roundInfo;
  }

  public getStatistic(): GameStatistic {
    return this._statistic;
  }

  public startNewRound(): void {
    this.initRoundData();

    this._roundInfo = {
      ...this._roundInfo,
      status: GameRoundStatus.IN_PROGRESS,
      winCellSequence: undefined,
    };

    this.waitForCurrentPlayerMove();
  }

  public onCellMarkSet(handler: () => void): () => void {
    this._cellMarkSetSubscribers.push(handler);

    return (): void => {
      removeArrayElement(this._cellMarkSetSubscribers, handler);
    };
  }

  public onRoundFinish(handler: () => void): () => void {
    this._roundFinishSubscribers.push(handler);

    return (): void => {
      removeArrayElement(this._roundFinishSubscribers, handler);
    };
  }

  private initRoundData(): void {
    const startingMark = this.isFirstRound()
      ? Mark.CROSS
      : invertMark(this._roundInfo.startingMark);

    this._markMatrix = new Matrix<Mark>(this._initialBoardMatrixSizes);

    this._currentMark = startingMark;

    this._roundInfo = { startingMark, status: GameRoundStatus.NOT_STARTED };
  }

  private handleCellMarkSet(cell: Cell): void {
    const { rowIndex, columnIndex } = cell;

    if (this._markMatrix.get(rowIndex, columnIndex)) {
      throw new GameServiceException(`Cell ${rowIndex}:${columnIndex} is already marked`);
    }

    this._markMatrix.set(rowIndex, columnIndex, this._currentMark);
    this._markMatrix.increaseMatrixSizeToIncludeCell(cell, { borderOffset: 2 });

    this._currentMark = invertMark(this._currentMark);

    const winCellSequence = getWinCellSequence(this._markMatrix);

    this._cellMarkSetSubscribers.forEach((subscriber) => subscriber());

    if (winCellSequence) {
      this.handleRoundFinish(winCellSequence);

      return;
    }

    this.waitForCurrentPlayerMove();
  }

  private waitForCurrentPlayerMove(): void {
    const currentPlayer = this.getCurrentPlayer();

    currentPlayer.getNextCellToMark(this._markMatrix).then((cell) => this.handleCellMarkSet(cell));
  }

  private handleRoundFinish(winCellSequence: CellSequence): void {
    this._roundInfo = {
      ...this._roundInfo,
      status: GameRoundStatus.FINISHED,
      winCellSequence,
    };

    const winnerMark = winCellSequence.mark;

    this._statistic = {
      ...this._statistic,
      winCount: {
        ...this._statistic.winCount,
        [winnerMark]: this._statistic.winCount[winnerMark] + 1,
      },
    };

    this._roundFinishSubscribers.forEach((subscriber) => subscriber());
  }

  private getCurrentPlayer(): Player {
    return findCurrentPlayer(this._players, this._currentMark)!;
  }

  private isFirstRound(): boolean {
    const { winCount } = this._statistic;

    return winCount[Mark.CROSS] === 0 && winCount[Mark.NOUGHT] === 0;
  }
}

export default GameService;
