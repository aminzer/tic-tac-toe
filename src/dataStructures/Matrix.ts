import { Cell, MatrixSizes } from '@app/types';

class Matrix<T> {
  private _minRowIndex: number;

  private _maxRowIndex: number;

  private _minColumnIndex: number;

  private _maxColumnIndex: number;

  private _data: Map<string, T>;

  public constructor({
    minRowIndex = 0,
    maxRowIndex = -1,
    minColumnIndex = 0,
    maxColumnIndex = -1,
  }: Partial<MatrixSizes> = {}) {
    this.ensureRangeIsValid(minRowIndex, maxRowIndex);
    this.ensureRangeIsValid(minColumnIndex, maxColumnIndex);

    this._minRowIndex = minRowIndex;
    this._maxRowIndex = maxRowIndex;
    this._minColumnIndex = minColumnIndex;
    this._maxColumnIndex = maxColumnIndex;

    this._data = new Map();
  }

  public get rowCount(): number {
    return this._maxRowIndex - this._minRowIndex + 1;
  }

  public get columnCount(): number {
    return this._maxColumnIndex - this._minColumnIndex + 1;
  }

  public get minRowIndex(): number {
    return this._minRowIndex;
  }

  public set minRowIndex(minRowIndex: number) {
    this.ensureRangeIsValid(minRowIndex, this._maxRowIndex);

    const isDeletionOutsideMatrixRequired = minRowIndex > this._minRowIndex;

    this._minRowIndex = minRowIndex;

    if (isDeletionOutsideMatrixRequired) {
      this.deleteDataOutsideMatrix();
    }
  }

  public get maxRowIndex(): number {
    return this._maxRowIndex;
  }

  public set maxRowIndex(maxRowIndex: number) {
    this.ensureRangeIsValid(this._minRowIndex, maxRowIndex);

    const isDeletionOutsideMatrixRequired = maxRowIndex < this._maxRowIndex;

    this._maxRowIndex = maxRowIndex;

    if (isDeletionOutsideMatrixRequired) {
      this.deleteDataOutsideMatrix();
    }
  }

  public get minColumnIndex(): number {
    return this._minColumnIndex;
  }

  public set minColumnIndex(minColumnIndex: number) {
    this.ensureRangeIsValid(minColumnIndex, this._maxColumnIndex);

    const isDeletionOutsideMatrixRequired = minColumnIndex > this._minColumnIndex;

    this._minColumnIndex = minColumnIndex;

    if (isDeletionOutsideMatrixRequired) {
      this.deleteDataOutsideMatrix();
    }
  }

  public get maxColumnIndex(): number {
    return this._maxColumnIndex;
  }

  public set maxColumnIndex(maxColumnIndex: number) {
    this.ensureRangeIsValid(this._minColumnIndex, maxColumnIndex);

    const isDeletionOutsideMatrixRequired = maxColumnIndex < this._maxColumnIndex;

    this._maxColumnIndex = maxColumnIndex;

    if (isDeletionOutsideMatrixRequired) {
      this.deleteDataOutsideMatrix();
    }
  }

  public get(rowIndex: number, columnIndex: number): T | undefined {
    this.ensureCellIsWithinMatrix(rowIndex, columnIndex);

    const dataKey = this.getDataKey(rowIndex, columnIndex);

    return this._data.get(dataKey);
  }

  public set(rowIndex: number, columnIndex: number, value: T): void {
    this.ensureCellIsWithinMatrix(rowIndex, columnIndex);

    const dataKey = this.getDataKey(rowIndex, columnIndex);

    this._data.set(dataKey, value);
  }

  public delete(rowIndex: number, columnIndex: number): void {
    this.ensureCellIsWithinMatrix(rowIndex, columnIndex);

    const dataKey = this.getDataKey(rowIndex, columnIndex);

    this._data.delete(dataKey);
  }

  public mapRows<U>(callback: (row: MatrixRow<T>) => U): U[] {
    const res: U[] = [];

    for (let rowIndex = this._minRowIndex; rowIndex <= this._maxRowIndex; rowIndex += 1) {
      res.push(callback(new MatrixRow(rowIndex, this)));
    }

    return res;
  }

  public mapColumns<U>(callback: (row: MatrixColumn<T>) => U): U[] {
    const res: U[] = [];

    for (
      let columnIndex = this._minColumnIndex;
      columnIndex <= this._maxColumnIndex;
      columnIndex += 1
    ) {
      res.push(callback(new MatrixColumn(columnIndex, this)));
    }

    return res;
  }

  public increaseMatrixSizeToIncludeCell(
    cell: Cell,
    {
      borderOffset = 0,
    }: {
      borderOffset?: number;
    } = {},
  ): void {
    const minRowIndexLimit = cell.rowIndex - borderOffset;
    const maxRowIndexLimit = cell.rowIndex + borderOffset;
    const minColumnIndexLimit = cell.columnIndex - borderOffset;
    const maxColumnIndexLimit = cell.columnIndex + borderOffset;

    if (this._minRowIndex > minRowIndexLimit) {
      this.minRowIndex = minRowIndexLimit;
    }

    if (this._maxRowIndex < maxRowIndexLimit) {
      this.maxRowIndex = maxRowIndexLimit;
    }

    if (this._minColumnIndex > minColumnIndexLimit) {
      this.minColumnIndex = minColumnIndexLimit;
    }

    if (this._maxColumnIndex < maxColumnIndexLimit) {
      this.maxColumnIndex = maxColumnIndexLimit;
    }
  }

  public getCentralCell(): Cell {
    return {
      rowIndex: Math.floor((this._maxRowIndex + this._minRowIndex) / 2),
      columnIndex: Math.floor((this._maxColumnIndex + this._minColumnIndex) / 2),
    };
  }

  public clone(): Matrix<T> {
    const newMatrix = new Matrix<T>({
      minRowIndex: this._minRowIndex,
      maxRowIndex: this._maxRowIndex,
      minColumnIndex: this._minColumnIndex,
      maxColumnIndex: this._maxColumnIndex,
    });

    newMatrix._data = new Map(this._data);

    return newMatrix;
  }

  private getDataKey(rowIndex: number, columnIndex: number): string {
    return `${rowIndex}_${columnIndex}`;
  }

  private parseDataKey(dataKey: string): { rowIndex: number; columnIndex: number } {
    const [rowIndexStr, columnIndexStr] = dataKey.split('_');

    const rowIndex = Number.parseInt(rowIndexStr, 10);
    const columnIndex = Number.parseInt(columnIndexStr, 10);

    return { rowIndex, columnIndex };
  }

  private isCellWithinMatrix(rowIndex: number, columnIndex: number): boolean {
    return (
      rowIndex >= this._minRowIndex &&
      rowIndex <= this._maxRowIndex &&
      columnIndex >= this._minColumnIndex &&
      columnIndex <= this._maxColumnIndex
    );
  }

  private ensureCellIsWithinMatrix(rowIndex: number, columnIndex: number): void {
    if (!this.isCellWithinMatrix(rowIndex, columnIndex)) {
      throw new Error(
        `Cell (${rowIndex},${columnIndex}) is out of matrix [${this._minRowIndex}..${this._maxRowIndex}][${this._minColumnIndex}..${this._maxColumnIndex}]`,
      );
    }
  }

  private ensureRangeIsValid(minIndex: number, maxIndex: number): void {
    if (minIndex > maxIndex + 1) {
      throw new Error(`Invalid index range: [${minIndex}...${maxIndex}]`);
    }
  }

  private deleteDataOutsideMatrix(): void {
    [...this._data.keys()]
      .filter((dataKey) => {
        const { rowIndex, columnIndex } = this.parseDataKey(dataKey);

        return !this.isCellWithinMatrix(rowIndex, columnIndex);
      })
      .forEach((dataKey) => {
        this._data.delete(dataKey);
      });
  }
}

class MatrixRow<T> {
  public constructor(
    public readonly index: number,
    private readonly matrix: Matrix<T>,
  ) {}

  public mapColumns<U>(callback: (cell: Cell) => U): U[] {
    const res: U[] = [];

    for (
      let columnIndex = this.matrix.minColumnIndex;
      columnIndex <= this.matrix.maxColumnIndex;
      columnIndex += 1
    ) {
      res.push(callback({ rowIndex: this.index, columnIndex }));
    }

    return res;
  }
}

class MatrixColumn<T> {
  public constructor(
    public readonly index: number,
    private readonly matrix: Matrix<T>,
  ) {}

  public mapRows<U>(callback: (cell: Cell) => U): U[] {
    const res: U[] = [];

    for (
      let rowIndex = this.matrix.minRowIndex;
      rowIndex <= this.matrix.maxRowIndex;
      rowIndex += 1
    ) {
      res.push(callback({ rowIndex, columnIndex: this.index }));
    }

    return res;
  }
}

export default Matrix;
