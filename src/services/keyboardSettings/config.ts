import { FocusedCellChangeDirection, KeyboardSettings } from './types';

export const DEFAULT_KEYBOARD_SETTINGS: KeyboardSettings = {
  focusedCellMovement: {
    [FocusedCellChangeDirection.UP]: 'ArrowUp',
    [FocusedCellChangeDirection.DOWN]: 'ArrowDown',
    [FocusedCellChangeDirection.LEFT]: 'ArrowLeft',
    [FocusedCellChangeDirection.RIGHT]: 'ArrowRight',
  },
};
