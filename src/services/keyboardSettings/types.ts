import { Mark } from '../../constants';

export enum FocusedCellChangeDirection {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

type KeyboardKeyCode = KeyboardEvent['code'];

export interface GameKeyboardSettings {
  focusedCellMovement: Record<FocusedCellChangeDirection, KeyboardKeyCode>;
  setCellMark: KeyboardKeyCode;
}

export interface KeyboardSettings {
  localMultiplayer: Record<Mark, GameKeyboardSettings>;
}
