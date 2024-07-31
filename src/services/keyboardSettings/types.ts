import { Mark } from '@app/constants';
import { FocusedCellChangeDirection } from './constants';

type KeyboardKeyCode = KeyboardEvent['code'];

export interface GameKeyboardSettings {
  focusedCellMovement: Record<FocusedCellChangeDirection, KeyboardKeyCode>;
  setCellMark: KeyboardKeyCode;
}

export interface KeyboardSettings {
  localMultiplayer: Record<Mark, GameKeyboardSettings>;
}
