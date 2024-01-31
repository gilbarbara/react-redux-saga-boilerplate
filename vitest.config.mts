import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      all: true,
      include: ['src/**/*.ts?(x)'],
      exclude: [
        'src/**/*.d.ts',
        'src/types/**/*',
        'src/reportWebVitals.ts',
        'src/store/middlewares-dev.ts',
      ],
      reporter: ['text', 'lcov'],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
      provider: 'v8',
    },
    environment: 'jsdom',
    globals: true,
    server: {
      deps: {
        inline: ['@gilbarbara/components'],
      },
    },
    setupFiles: [
      './test/__setup__/vitest.setup.ts',
      './test/__mocks__/gilbarbara__helpers.ts',
      './test/__mocks__/react-helmet-async.tsx',
      './test/__mocks__/react-inlinesvg.tsx',
      './test/__mocks__/react-router-dom.tsx',
    ],
  },
});
