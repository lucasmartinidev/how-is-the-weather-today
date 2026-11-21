import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: ['src/components/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}', 'src/services/**/*.{ts,tsx}', 'src/views/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/components/ui/**', 'src/types/**', 'src/vite-env.d.ts'],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
