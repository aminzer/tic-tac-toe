import { DEFAULT_KEYBOARD_SETTINGS } from './config';
import { KeyboardSettings } from './types';

const getKeyboardSettings = (): KeyboardSettings => {
  return DEFAULT_KEYBOARD_SETTINGS;
};

export default getKeyboardSettings;
