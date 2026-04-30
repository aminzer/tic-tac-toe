const TITLE_POSTFIX = 'Tic Tac Toe';

const setTitle = (title?: string): void => {
  const fullTitle = title ? `${title} - ${TITLE_POSTFIX}` : TITLE_POSTFIX;

  document.title = fullTitle;
};

export default setTitle;
