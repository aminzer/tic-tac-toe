import { formatTestName } from '@aminzer/describe-function-test';
import { Mark } from '@app/constants';
import { Player } from '../../player';
import findCurrentPlayer from '../findCurrentPlayer';

describe(formatTestName(__filename), () => {
  it('should return the player with the current mark', () => {
    const players: Player[] = [
      { getMark: () => Mark.CROSS, getNextCellToMark: jest.fn() },
      { getMark: () => Mark.NOUGHT, getNextCellToMark: jest.fn() },
    ];

    const currentMark = Mark.CROSS;

    expect(findCurrentPlayer(players, currentMark)).toBe(players[0]);
  });

  it('should return undefined if no player has the current mark', () => {
    const players: Player[] = [{ getMark: () => Mark.CROSS, getNextCellToMark: jest.fn() }];

    const currentMark = Mark.NOUGHT;

    expect(findCurrentPlayer(players, currentMark)).toBeUndefined();
  });

  it('should return undefined if the players array is empty', () => {
    const players: Player[] = [];

    const currentMark = Mark.CROSS;

    expect(findCurrentPlayer(players, currentMark)).toBeUndefined();
  });
});
