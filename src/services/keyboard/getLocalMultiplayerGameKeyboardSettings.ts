import { Mark } from '@app/constants';
import { GameKeyboardSettings, getKeyboardSettings } from '../keyboardSettings';

const getLocalMultiplayerGameKeyboardSettings = (currentPlayerMark: Mark): GameKeyboardSettings => {
  const keyboardSettings = getKeyboardSettings();

  return keyboardSettings.localMultiplayer[currentPlayerMark];
};

export default getLocalMultiplayerGameKeyboardSettings;
