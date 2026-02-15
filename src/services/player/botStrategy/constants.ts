const WIN_SEQUENCE_LENGTH = 5;

const DIRECTIONS: [number, number][] = [
  [0, 1], // horizontal
  [1, 0], // vertical
  [1, 1], // top-left to bottom-right diagonal
  [1, -1], // top-right to bottom-left diagonal
];

const SCORE_TABLE: Record<number, number> = {
  1: 1,
  2: 10,
  3: 100,
  4: 10000,
};

const WIN_SCORE = 1000000;

const OFFENSE_WEIGHT = 1.1;

export { WIN_SEQUENCE_LENGTH, DIRECTIONS, SCORE_TABLE, WIN_SCORE, OFFENSE_WEIGHT };
