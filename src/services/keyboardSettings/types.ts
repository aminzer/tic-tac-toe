export enum FocusedCellChangeDirection {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

type KeyboardKeyCode = KeyboardEvent['code'];

export interface KeyboardSettings {
  focusedCellMovement: Record<FocusedCellChangeDirection, KeyboardKeyCode>;
  setCellMark: KeyboardKeyCode;
}
