import getKeyboardSettings from './getKeyboardSettings';

const handleCellMarkSet = (event: KeyboardEvent, handler: () => void): void => {
  const settings = getKeyboardSettings();

  if (event.code === settings.setCellMark) {
    handler();
  }
};

export default handleCellMarkSet;
