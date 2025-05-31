import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.{test,spec}.{ts,js}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      reporter: ['json-summary', 'html'],
      all: true,
      include: ['src/**/*.{ts,js}'],
      exclude: ['src/**/*.d.ts', 'src/index.ts', 'src/interfaces/**/*'],
    },
  },
});
