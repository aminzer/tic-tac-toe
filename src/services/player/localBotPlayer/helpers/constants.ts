export const WIN_SEQUENCE_LENGTH = 5;

export const NEIGHBOR_CELLS_OFFSETS: { rowDelta: number; columnDelta: number }[] = [
  { rowDelta: -1, columnDelta: -1 },
  { rowDelta: -1, columnDelta: 0 },
  { rowDelta: -1, columnDelta: 1 },
  { rowDelta: 0, columnDelta: -1 },
  { rowDelta: 0, columnDelta: 1 },
  { rowDelta: 1, columnDelta: -1 },
  { rowDelta: 1, columnDelta: 0 },
  { rowDelta: 1, columnDelta: 1 },
];

export const DIRECTIONS: { rowDelta: number; columnDelta: number }[] = [
  { rowDelta: 0, columnDelta: 1 }, // horizontal
  { rowDelta: 1, columnDelta: 0 }, // vertical
  { rowDelta: 1, columnDelta: 1 }, // top-left to bottom-right diagonal
  { rowDelta: 1, columnDelta: -1 }, // top-right to bottom-left diagonal
];

export const SCORE_TABLE: Record<number, number> = {
  1: 1,
  2: 10,
  3: 100,
  4: 10000,
};

export const WIN_SCORE = 1000000;

export const OFFENSE_WEIGHT = 1.1;
