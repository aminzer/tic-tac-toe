import path from "path";
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const baseUrlPath = env.VITE_BASE_URL_PATH ?? '/'

  return {
    base: baseUrlPath,
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
