import { GameKeyboardSettings } from '../keyboardSettings';
import { FocusedCellChange } from './types';

const getFocusedCellChange = ({
  event,
  gameKeyboardSettings,
}: {
  event: Pick<KeyboardEvent, 'code'>;
  gameKeyboardSettings: Pick<GameKeyboardSettings, 'focusedCellMovement'>;
}): FocusedCellChange | null => {
  if (event.code === gameKeyboardSettings.focusedCellMovement.UP) {
    return {
      rowDelta: -1,
      columnDelta: 0,
    };
  }

  if (event.code === gameKeyboardSettings.focusedCellMovement.DOWN) {
    return {
      rowDelta: 1,
      columnDelta: 0,
    };
  }

  if (event.code === gameKeyboardSettings.focusedCellMovement.LEFT) {
    return {
      rowDelta: 0,
      columnDelta: -1,
    };
  }

  if (event.code === gameKeyboardSettings.focusedCellMovement.RIGHT) {
    return {
      rowDelta: 0,
      columnDelta: 1,
    };
  }

  return null;
};

export default getFocusedCellChange;
