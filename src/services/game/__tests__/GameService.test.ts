import { formatTestName } from '@aminzer/describe-function-test';
import { GameRoundStatus, Mark } from '@app/constants';
import { LocalHumanPlayer, Player } from '../../player';
import GameService from '../GameService';

describe(formatTestName(__filename), () => {
  let players: Player[];
  let gameService: GameService;

  beforeEach(() => {
    players = [
      new LocalHumanPlayer({ mark: Mark.CROSS }),
      new LocalHumanPlayer({ mark: Mark.NOUGHT }),
    ];

    gameService = new GameService({ players });
  });

  it('should initialize with the correct initial values', () => {
    expect(gameService.getMarkMatrix()).toBeDefined();

    expect(gameService.getCurrentMark()).toBe(Mark.CROSS);

    expect(gameService.getRoundInfo()).toEqual({
      startingMark: Mark.CROSS,
      status: GameRoundStatus.NOT_STARTED,
    });

    expect(gameService.getStatistic()).toEqual({
      winCount: {
        [Mark.CROSS]: 0,
        [Mark.NOUGHT]: 0,
      },
    });
  });

  it('should start a new round correctly', () => {
    gameService.startNewRound();
    expect(gameService.getRoundInfo().status).toBe(GameRoundStatus.IN_PROGRESS);
  });

  it('should add and remove cell mark set subscribers', () => {
    const handler = jest.fn();
    const unsubscribe = gameService.onCellMarkSet(handler);

    gameService.onCellMarkSet(handler);
    unsubscribe();

    // Simulate a cell mark set event
    (gameService as any)._cellMarkSetSubscribers.forEach((sub: () => void) => sub());

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should add and remove round finish subscribers', () => {
    const handler = jest.fn();
    const unsubscribe = gameService.onRoundFinish(handler);

    gameService.onRoundFinish(handler);
    unsubscribe();

    // Simulate a round finish event
    (gameService as any)._roundFinishSubscribers.forEach((sub: () => void) => sub());

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
