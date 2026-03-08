import { formatTestName } from '@aminzer/describe-function-test';
import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import countConsecutive from '../countConsecutive';

describe(formatTestName(__filename), () => {
  let matrix: Matrix<Mark>;

  beforeEach(() => {
    matrix = new Matrix<Mark>({ maxRowIndex: 6, maxColumnIndex: 6 });
  });

  it('returns 0 when the adjacent cell does not match the target mark', () => {
    matrix.set(3, 3, Mark.CROSS);
    matrix.set(3, 4, Mark.NOUGHT);

    expect(
      countConsecutive({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 0,
        columnDelta: 1,
        targetMark: Mark.CROSS,
      }),
    ).toBe(0);
  });

  it('returns 0 when the adjacent cell is empty', () => {
    matrix.set(3, 3, Mark.CROSS);

    expect(
      countConsecutive({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 0,
        columnDelta: 1,
        targetMark: Mark.CROSS,
      }),
    ).toBe(0);
  });

  it('counts consecutive marks horizontally', () => {
    matrix.set(3, 3, Mark.CROSS);
    matrix.set(3, 4, Mark.CROSS);
    matrix.set(3, 5, Mark.CROSS);

    expect(
      countConsecutive({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 0,
        columnDelta: 1,
        targetMark: Mark.CROSS,
      }),
    ).toBe(2);
  });

  it('counts consecutive marks vertically', () => {
    matrix.set(2, 3, Mark.NOUGHT);
    matrix.set(3, 3, Mark.NOUGHT);
    matrix.set(4, 3, Mark.NOUGHT);
    matrix.set(5, 3, Mark.NOUGHT);

    expect(
      countConsecutive({
        markMatrix: matrix,
        startRowIndex: 2,
        startColumnIndex: 3,
        rowDelta: 1,
        columnDelta: 0,
        targetMark: Mark.NOUGHT,
      }),
    ).toBe(3);
  });

  it('counts consecutive marks diagonally', () => {
    matrix.set(1, 1, Mark.CROSS);
    matrix.set(2, 2, Mark.CROSS);
    matrix.set(3, 3, Mark.CROSS);

    expect(
      countConsecutive({
        markMatrix: matrix,
        startRowIndex: 1,
        startColumnIndex: 1,
        rowDelta: 1,
        columnDelta: 1,
        targetMark: Mark.CROSS,
      }),
    ).toBe(2);
  });

  it('stops counting when a different mark is encountered', () => {
    matrix.set(3, 3, Mark.CROSS);
    matrix.set(3, 4, Mark.CROSS);
    matrix.set(3, 5, Mark.NOUGHT);
    matrix.set(3, 6, Mark.CROSS);

    expect(
      countConsecutive({
        markMatrix: matrix,
        startRowIndex: 3,
        startColumnIndex: 3,
        rowDelta: 0,
        columnDelta: 1,
        targetMark: Mark.CROSS,
      }),
    ).toBe(1);
  });

  it('stops counting at matrix boundary', () => {
    matrix.set(0, 0, Mark.CROSS);
    matrix.set(0, 1, Mark.CROSS);
    matrix.set(0, 2, Mark.CROSS);

    expect(
      countConsecutive({
        markMatrix: matrix,
        startRowIndex: 0,
        startColumnIndex: 0,
        rowDelta: 0,
        columnDelta: -1,
        targetMark: Mark.CROSS,
      }),
    ).toBe(0);
    expect(
      countConsecutive({
        markMatrix: matrix,
        startRowIndex: 0,
        startColumnIndex: 0,
        rowDelta: 0,
        columnDelta: 1,
        targetMark: Mark.CROSS,
      }),
    ).toBe(2);
  });
});
