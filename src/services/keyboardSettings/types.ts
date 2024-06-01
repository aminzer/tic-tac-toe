export interface FocusedCellChange {
  rowDelta: number;
  columnDelta: number;
}

export enum FocusedCellChangeDirection {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface KeyboardSettings {
  focusedCellMovement: Record<FocusedCellChangeDirection, string>;
}
