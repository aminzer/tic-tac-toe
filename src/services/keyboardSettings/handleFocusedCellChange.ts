import getFocusedCellChange from './getFocusedCellChange';
import getKeyboardSettings from './getKeyboardSettings';
import { FocusedCellChange } from './types';

const handleFocusedCellChange = (
  event: KeyboardEvent,
  handler: (FocusedCellChange: FocusedCellChange) => void,
): void => {
  const settings = getKeyboardSettings();

  const focusedCellChange = getFocusedCellChange({ event, settings });

  if (focusedCellChange) {
    handler(focusedCellChange);
  }
};

export default handleFocusedCellChange;
