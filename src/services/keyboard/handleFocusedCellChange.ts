import { Mark } from '@app/constants';
import getFocusedCellChange from './getFocusedCellChange';
import getLocalMultiplayerGameKeyboardSettings from './getLocalMultiplayerGameKeyboardSettings';
import { FocusedCellChange } from './types';

const handleFocusedCellChange = (
  event: KeyboardEvent,
  currentPlayerMark: Mark,
  handler: (FocusedCellChange: FocusedCellChange) => void,
): void => {
  const gameKeyboardSettings = getLocalMultiplayerGameKeyboardSettings(currentPlayerMark);

  const focusedCellChange = getFocusedCellChange({ event, gameKeyboardSettings });

  if (focusedCellChange) {
    handler(focusedCellChange);
  }
};

export default handleFocusedCellChange;
