import { Mark } from '../../constants';
import getLocalMultiplayerGameKeyboardSettings from './getLocalMultiplayerGameKeyboardSettings';

const handleCellMarkSet = (
  event: KeyboardEvent,
  currentPlayerMark: Mark,
  handler: () => void,
): void => {
  const gameKeyboardSettings = getLocalMultiplayerGameKeyboardSettings(currentPlayerMark);

  if (event.code === gameKeyboardSettings.setCellMark) {
    handler();
  }
};

export default handleCellMarkSet;
