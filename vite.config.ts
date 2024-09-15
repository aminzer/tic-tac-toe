import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const basePath = mode === 'production' ? '/tic-tac-toe/' : '/';

  return {
    base: basePath,
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: [
            "@emotion/babel-plugin",
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@app": path.resolve(__dirname, "./src"),
      },
    },
  }
});
