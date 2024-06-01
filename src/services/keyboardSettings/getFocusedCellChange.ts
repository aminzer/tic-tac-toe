import getKeyboardSettings from './getKeyboardSettings';
import { FocusedCellChange } from './types';

const getFocusedCellChange = (event: KeyboardEvent): FocusedCellChange | null => {
  const settings = getKeyboardSettings();

  if (event.key === settings.focusedCellMovement.UP) {
    return {
      rowDelta: -1,
      columnDelta: 0,
    };
  }

  if (event.key === settings.focusedCellMovement.DOWN) {
    return {
      rowDelta: 1,
      columnDelta: 0,
    };
  }

  if (event.key === settings.focusedCellMovement.LEFT) {
    return {
      rowDelta: 0,
      columnDelta: -1,
    };
  }

  if (event.key === settings.focusedCellMovement.RIGHT) {
    return {
      rowDelta: 0,
      columnDelta: 1,
    };
  }

  return null;
};

export default getFocusedCellChange;
