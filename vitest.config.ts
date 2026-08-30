import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/api/**/*.test.ts', 'src/api/**/*.test.ts'],
    reporters: ['default'],
  },
});
