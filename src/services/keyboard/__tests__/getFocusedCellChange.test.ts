import { describeFunctionTest } from '@aminzer/describe-function-test';
import getFocusedCellChange from '../getFocusedCellChange';
import { FocusedCellChangeDirection, KeyboardSettings } from '../../keyboardSettings/types';

export const settings: Pick<KeyboardSettings, 'focusedCellMovement'> = {
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
      args: [{ event: { code: 'KeyA' }, settings }],
      expectedResult: null,
    },
    {
      args: [{ event: { code: 'Space' }, settings }],
      expectedResult: null,
    },
    {
      args: [{ event: { code: 'ArrowUp' }, settings }],
      expectedResult: { rowDelta: -1, columnDelta: 0 },
    },
    {
      args: [{ event: { code: 'ArrowDown' }, settings }],
      expectedResult: { rowDelta: 1, columnDelta: 0 },
    },
    {
      args: [{ event: { code: 'ArrowLeft' }, settings }],
      expectedResult: { rowDelta: 0, columnDelta: -1 },
    },
    {
      args: [{ event: { code: 'ArrowRight' }, settings }],
      expectedResult: { rowDelta: 0, columnDelta: 1 },
    },
  ],
});
