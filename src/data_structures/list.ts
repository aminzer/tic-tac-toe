/**
 * Array-like data structure with possible negative element indexes
 */

export class List<T> implements Iterable<T> {
  private _minIndex: number = 0;
  private _maxIndex: number = -1;
  private _data: Map<number, T>;

  constructor({ minIndex = 0, maxIndex = -1 }: { minIndex?: number, maxIndex?: number } = {}) {
    this.ensureRangeIsValid(minIndex, maxIndex);

    this._minIndex = minIndex;
    this._maxIndex = maxIndex;
    this._data = new Map();
  }

  get minIndex(): number {
    return this._minIndex;
  }

  set minIndex(minIndex: number) {
    this.ensureRangeIsValid(minIndex, this._maxIndex);

    this._minIndex = minIndex;
  }

  get maxIndex(): number {
    return this._maxIndex;
  }

  set maxIndex(maxIndex: number) {
    this.ensureRangeIsValid(this._minIndex, maxIndex);

    this._maxIndex = maxIndex;
  }

  get size(): number {
    return this._maxIndex - this._minIndex + 1;
  }

  get(index: number): T {
    this.ensureIndexIsWithinRange(index);

    return this._data.get(index) as T;
  }

  set(index: number, value: T): void {
    this.ensureIndexIsWithinRange(index);

    this._data.set(index, value);
  }

  push(value: T): void {
    this._maxIndex++;
    this.set(this._maxIndex, value);
  }

  pushFromStart(value: T): void {
    this._minIndex--;
    this.set(this._minIndex, value);
  }

  forEach(callback: (element: T, index: number) => void): void {
    for (let index = this._minIndex; index <= this._maxIndex; index++) {
      callback(this.get(index), index);
    }
  }

  map<U>(callback: (element: T, index: number) => U): U[] {
    const result: U[] = [];

    this.forEach((element, index) => {
      result.push(callback(element, index));
    });

    return result;
  }

  [Symbol.iterator](): Iterator<T> {
    const { _minIndex, _maxIndex } = this;
    let index = _minIndex;

    return {
      next: () => {
        if (index > _maxIndex) {
          return {
            done: true,
            value: undefined,
          }
        }

        return {
          done: false,
          value: this.get(index++),
        };
      }
    };
  }

  private ensureIndexIsWithinRange(index: number): void {
    if (index < this._minIndex || index > this._maxIndex) {
      throw new Error(`Index (${index}) is out of range [${this._minIndex},${this._maxIndex}]`);
    }
  }

  private ensureRangeIsValid(minIndex: number, maxIndex: number): void {
    if (minIndex > maxIndex + 1) {
      throw new Error(`minIndex (${minIndex}) cannot be greater than maxIndex + 1 (${maxIndex + 1})`);
    }
  }
}
