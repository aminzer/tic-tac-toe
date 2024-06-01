import getFocusedCellChange from './getFocusedCellChange';
import { FocusedCellChange } from './types';

const handleFocusedCellChange = (
  event: KeyboardEvent,
  handler: (FocusedCellChange: FocusedCellChange) => void,
): void => {
  const focusedCellChange = getFocusedCellChange(event);

  if (focusedCellChange) {
    handler(focusedCellChange);
  }
};

export default handleFocusedCellChange;
