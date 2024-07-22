import { FocusedCellChange, KeyboardSettings } from './types';

const getFocusedCellChange = ({
  event,
  settings,
}: {
  event: Pick<KeyboardEvent, 'code'>;
  settings: KeyboardSettings;
}): FocusedCellChange | null => {
  if (event.code === settings.focusedCellMovement.UP) {
    return {
      rowDelta: -1,
      columnDelta: 0,
    };
  }

  if (event.code === settings.focusedCellMovement.DOWN) {
    return {
      rowDelta: 1,
      columnDelta: 0,
    };
  }

  if (event.code === settings.focusedCellMovement.LEFT) {
    return {
      rowDelta: 0,
      columnDelta: -1,
    };
  }

  if (event.code === settings.focusedCellMovement.RIGHT) {
    return {
      rowDelta: 0,
      columnDelta: 1,
    };
  }

  return null;
};

export default getFocusedCellChange;
