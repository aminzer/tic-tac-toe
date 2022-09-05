const TITLE_POSTFIX = 'TicTacToe';

export const setTitle = (title?: string): void => {
  const fullTitle = title ? `${title} __ ${TITLE_POSTFIX}` : TITLE_POSTFIX;
  
  document.title = fullTitle;
}
