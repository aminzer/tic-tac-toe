import { Global, css, useTheme } from '@emotion/react';

const GlobalStyles: React.FC = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }

        body {
          position: relative;
          height: 100vh;
          width: 100vw;
          margin: 0;
          padding: 0;
          background-color: ${theme.palette.background.default};
          color: ${theme.palette.primary.default};
          font-family: ${theme.fonts.fontFamily.default};
        }

        #root {
          height: 100%;
          width: 100%;
        }
      `}
    />
  );
};

export default GlobalStyles;
