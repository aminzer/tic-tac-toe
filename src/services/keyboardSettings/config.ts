import { Mark } from '@app/constants';
import { FocusedCellChangeDirection } from './constants';
import { KeyboardSettings } from './types';

export const DEFAULT_KEYBOARD_SETTINGS: KeyboardSettings = {
  localMultiplayer: {
    [Mark.CROSS]: {
      focusedCellMovement: {
        [FocusedCellChangeDirection.UP]: 'KeyW',
        [FocusedCellChangeDirection.DOWN]: 'KeyS',
        [FocusedCellChangeDirection.LEFT]: 'KeyA',
        [FocusedCellChangeDirection.RIGHT]: 'KeyD',
      },
      setCellMark: 'Space',
    },
    [Mark.NOUGHT]: {
      focusedCellMovement: {
        [FocusedCellChangeDirection.UP]: 'ArrowUp',
        [FocusedCellChangeDirection.DOWN]: 'ArrowDown',
        [FocusedCellChangeDirection.LEFT]: 'ArrowLeft',
        [FocusedCellChangeDirection.RIGHT]: 'ArrowRight',
      },
      setCellMark: 'Enter',
    },
  },
};
