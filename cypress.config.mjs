import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,
  projectId: 'up2gfx',
  video: false,
  viewportHeight: 800,
  viewportWidth: 1280,
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
