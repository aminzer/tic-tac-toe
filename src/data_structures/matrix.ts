export class Matrix<T> {
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
  }: {
    minRowIndex?: number;
    maxRowIndex?: number;
    minColumnIndex?: number;
    maxColumnIndex?: number;
  } = {}) {
    this.ensureRangeIsValid(minRowIndex, maxRowIndex);
    this.ensureRangeIsValid(minColumnIndex, maxColumnIndex);

    this._minRowIndex = minRowIndex;
    this._maxRowIndex = maxRowIndex;
    this._minColumnIndex = minColumnIndex;
    this._maxColumnIndex = maxColumnIndex;

    this._data = new Map();
  }

  get rowCount(): number {
    return this._maxRowIndex - this._minRowIndex + 1;
  }

  get columnCount(): number {
    return this._maxColumnIndex - this._minColumnIndex + 1;
  }

  get minRowIndex(): number {
    return this._minRowIndex;
  }

  get maxRowIndex(): number {
    return this._maxRowIndex;
  }

  get minColumnIndex(): number {
    return this._minColumnIndex;
  }

  get maxColumnIndex(): number {
    return this._maxColumnIndex;
  }

  set minRowIndex(minRowIndex: number) {
    this.ensureRangeIsValid(minRowIndex, this._maxRowIndex);

    const isDeletionOutsideMatrixRequired = minRowIndex > this._minRowIndex;

    this._minRowIndex = minRowIndex;

    if (isDeletionOutsideMatrixRequired) {
      this.deleteDataOutsizeMatrix();
    }
  }

  set maxRowIndex(maxRowIndex: number) {
    this.ensureRangeIsValid(this._minRowIndex, maxRowIndex);

    const isDeletionOutsideMatrixRequired = maxRowIndex < this._maxRowIndex;

    this._maxRowIndex = maxRowIndex;

    if (isDeletionOutsideMatrixRequired) {
      this.deleteDataOutsizeMatrix();
    }
  }

  set minColumnIndex(minColumnIndex: number) {
    this.ensureRangeIsValid(minColumnIndex, this._maxColumnIndex);

    const isDeletionOutsideMatrixRequired = minColumnIndex > this._minColumnIndex;

    this._minColumnIndex = minColumnIndex;

    if (isDeletionOutsideMatrixRequired) {
      this.deleteDataOutsizeMatrix();
    }
  }

  set maxColumnIndex(maxColumnIndex: number) {
    this.ensureRangeIsValid(this._minColumnIndex, maxColumnIndex);

    const isDeletionOutsideMatrixRequired = maxColumnIndex < this._maxColumnIndex;

    this._maxColumnIndex = maxColumnIndex;

    if (isDeletionOutsideMatrixRequired) {
      this.deleteDataOutsizeMatrix();
    }
  }

  get(rowIndex: number, columnIndex: number): T | undefined {
    this.ensureCellIsWithinMatrix(rowIndex, columnIndex);

    const dataKey = this.stringifyDataKey(rowIndex, columnIndex);

    return this._data.get(dataKey);
  }

  set(rowIndex: number, columnIndex: number, value: T): void {
    this.ensureCellIsWithinMatrix(rowIndex, columnIndex);

    const dataKey = this.stringifyDataKey(rowIndex, columnIndex);

    this._data.set(dataKey, value);
  }

  private stringifyDataKey(rowIndex: number, columnIndex: number): string {
    return `${rowIndex}_${columnIndex}`;
  }

  private parseDataKey(dataKey: string): { rowIndex: number, columnIndex: number } {
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
      throw new Error(`Cell (${rowIndex},${columnIndex}) is out of matrix [${this._minRowIndex}..${this._maxRowIndex}][${this._minColumnIndex}..${this._maxColumnIndex}]`);
    }
  }

  private ensureRangeIsValid(minIndex: number, maxIndex: number): void {
    if (minIndex > maxIndex + 1) {
      throw new Error(`Invalid index range: [${minIndex}...${maxIndex}]`);
    }
  }

  private deleteDataOutsizeMatrix(): void {
    [...this._data.keys()]
      .filter(dataKey => {
        const { rowIndex, columnIndex } = this.parseDataKey(dataKey);

        return !this.isCellWithinMatrix(rowIndex, columnIndex);
      })
      .forEach(dataKey => {
        this._data.delete(dataKey);
      });
  }
}
