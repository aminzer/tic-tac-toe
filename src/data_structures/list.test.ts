import { List } from './list';

describe('List', () => {
  describe('constructor', () => {
    describe('when no arguments are passed', () => {
      it('creates empty list', () => {
        const list = new List();

        expect(list.minIndex).toEqual(0);
        expect(list.maxIndex).toEqual(-1);

        expect(list.size).toEqual(0);
      });
    });

    describe('when minIndex is passed', () => {
      it('creates list with correct index range', () => {
        const list = new List({ minIndex: -2 });

        expect(list.minIndex).toEqual(-2);
        expect(list.maxIndex).toEqual(-1);

        expect(list.size).toEqual(2);
      });
    });

    describe('when maxIndex is passed', () => {
      it('creates list with correct index range', () => {
        const list = new List({ maxIndex: 3 });

        expect(list.minIndex).toEqual(0);
        expect(list.maxIndex).toEqual(3);

        expect(list.size).toEqual(4);
      });
    });

    describe('when minIndex and maxIndex are passed', () => {
      describe('when minIndex < maxIndex + 1', () => {
        it('creates list with correct index range', () => {
          const list = new List({ minIndex: 2, maxIndex: 2 });

          expect(list.minIndex).toEqual(2);
          expect(list.maxIndex).toEqual(2);

          expect(list.size).toEqual(1);
        });
      });

      describe('when minIndex == maxIndex + 1', () => {
        it('creates list with correct index range', () => {
          const list = new List({ minIndex: 2, maxIndex: 1 });

          expect(list.minIndex).toEqual(2);
          expect(list.maxIndex).toEqual(1);

          expect(list.size).toEqual(0);
        });
      });

      describe('when minIndex > maxIndex + 1', () => {
        it('throws error', () => {
          expect(() => {
            new List({ minIndex: 2, maxIndex: 0 })
          }).toThrow();
        });
      });
    });
  });

  describe('set minIndex', () => {
    describe.skip('when list size was decreased and increased back', () => { // TODO fix case
      const list = new List<string>({
        minIndex: 0,
        maxIndex: 3,
      });

      list.set(0, 'a');
      list.set(1, 'b');
      list.set(2, 'c');
      list.set(3, 'd');

      list.minIndex = 2;
      list.minIndex = 0;

      it('clears elements that were outside decreased index range', () => {
        expect(list.get(0)).toBe(undefined);
        expect(list.get(1)).toBe(undefined);
      });

      it('preserve elements that were within decreased index range', () => {
        expect(list.get(2)).toBe('c');
        expect(list.get(3)).toBe('d');
      });
    });
  });
});
