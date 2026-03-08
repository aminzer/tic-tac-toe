import { formatTestName } from '@aminzer/describe-function-test';
import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import countUnblockedCells from '../countUnblockedCells';

describe(formatTestName(__filename), () => {
  let matrix: Matrix<Mark>;

  beforeEach(() => {
    matrix = new Matrix<Mark>({ maxRowIndex: 6, maxColumnIndex: 6 });
  });

  it('counts empty cells until hitting the opponent mark', () => {
    matrix.set(3, 6, Mark.NOUGHT);

    expect(
      countUnblockedCells({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 0,
        columnDelta: 1,
        opponentMark: Mark.NOUGHT,
        maxCount: 5,
      }),
    ).toBe(2);
  });

  it('counts up to maxCount even if more space is available', () => {
    expect(
      countUnblockedCells({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 0,
        columnDelta: 1,
        opponentMark: Mark.NOUGHT,
        maxCount: 2,
      }),
    ).toBe(2);
  });

  it('returns 0 when the next cell has the opponent mark', () => {
    matrix.set(3, 4, Mark.NOUGHT);

    expect(
      countUnblockedCells({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 0,
        columnDelta: 1,
        opponentMark: Mark.NOUGHT,
        maxCount: 5,
      }),
    ).toBe(0);
  });

  it('counts own marks as open space', () => {
    matrix.set(3, 4, Mark.CROSS);

    expect(
      countUnblockedCells({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 0,
        columnDelta: 1,
        opponentMark: Mark.NOUGHT,
        maxCount: 5,
      }),
    ).toBe(5);
  });

  it('does not stop at matrix boundary', () => {
    expect(
      countUnblockedCells({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 0,
        columnDelta: -1,
        opponentMark: Mark.NOUGHT,
        maxCount: 10,
      }),
    ).toBe(10);
  });

  it('counts open space vertically', () => {
    matrix.set(5, 3, Mark.CROSS);

    expect(
      countUnblockedCells({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 1,
        columnDelta: 0,
        opponentMark: Mark.CROSS,
        maxCount: 5,
      }),
    ).toBe(1);
  });

  it('counts open space diagonally', () => {
    expect(
      countUnblockedCells({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 1,
        columnDelta: 1,
        opponentMark: Mark.NOUGHT,
        maxCount: 5,
      }),
    ).toBe(5);
  });
});
