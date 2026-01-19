import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'e2e',
  timeout: 30 * 1000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5 * 1000,
    baseURL: 'http://localhost:4200',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
};

export default config;
