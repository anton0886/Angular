import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import inlineComponentResources from './vitest/plugins/inline-resources';

export default defineConfig({
  plugins: [inlineComponentResources(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test-setup.ts',
    include: ['src/**/*.spec.ts'],
    css: true,
    deps: {
      inline: [/rxjs/, /@angular/],
    },
  },
});
