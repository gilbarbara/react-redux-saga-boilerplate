import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      sourcemap: true,
    },
    define: {
      'process.env': env,
    },
    plugins: [
      tsconfigPaths(),
      viteCommonjs(),
      react(),
      VitePWA({
        includeAssets: [
          'app-icons/favicon.svg',
          'app-icons/favicon.ico',
          'robots.txt',
          'app-icons/apple-touch-icon.png',
        ],
        manifest: {
          short_name: 'React-Redux-Saga',
          name: 'React-Redux-Saga Boilerplate',
          background_color: '#333333',
          theme_color: '#333333',
          icons: [
            {
              src: 'media/meta-icons/icon-96x96.png',
              sizes: '96x96',
              type: 'image/png',
            },
            {
              src: 'media/meta-icons/icon-144x144.png',
              sizes: '144x144',
              type: 'image/png',
            },
            {
              src: 'media/meta-icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'media/meta-icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
          start_url: './?utm_source=web_app',
          display: 'fullscreen',
          orientation: 'portrait',
        },
      }),
    ],
    preview: {
      open: true,
      port: 3000,
    },
    server: {
      host: true,
      port: 3000,
      open: true,
    },
  };
});
