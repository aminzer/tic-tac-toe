const TITLE_POSTFIX = 'TicTacToe';

const setTitle = (title?: string): void => {
  const fullTitle = title ? `${title} - ${TITLE_POSTFIX}` : TITLE_POSTFIX;

  document.title = fullTitle;
};

export default setTitle;
