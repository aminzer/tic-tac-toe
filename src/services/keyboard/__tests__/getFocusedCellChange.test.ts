import { describeFunctionTest } from '@aminzer/describe-function-test';
import getFocusedCellChange from '../getFocusedCellChange';
import { FocusedCellChangeDirection, GameKeyboardSettings } from '../../keyboardSettings';

export const gameKeyboardSettings: Pick<GameKeyboardSettings, 'focusedCellMovement'> = {
  focusedCellMovement: {
    [FocusedCellChangeDirection.UP]: 'ArrowUp',
    [FocusedCellChangeDirection.DOWN]: 'ArrowDown',
    [FocusedCellChangeDirection.LEFT]: 'ArrowLeft',
    [FocusedCellChangeDirection.RIGHT]: 'ArrowRight',
  },
};

describeFunctionTest(getFocusedCellChange, __filename, {
  testCases: [
    {
      args: [{ event: { code: 'KeyA' }, gameKeyboardSettings }],
      expectedResult: null,
    },
    {
      args: [{ event: { code: 'Space' }, gameKeyboardSettings }],
      expectedResult: null,
    },
    {
      args: [{ event: { code: 'ArrowUp' }, gameKeyboardSettings }],
      expectedResult: { rowDelta: -1, columnDelta: 0 },
    },
    {
      args: [{ event: { code: 'ArrowDown' }, gameKeyboardSettings }],
      expectedResult: { rowDelta: 1, columnDelta: 0 },
    },
    {
      args: [{ event: { code: 'ArrowLeft' }, gameKeyboardSettings }],
      expectedResult: { rowDelta: 0, columnDelta: -1 },
    },
    {
      args: [{ event: { code: 'ArrowRight' }, gameKeyboardSettings }],
      expectedResult: { rowDelta: 0, columnDelta: 1 },
    },
  ],
});
