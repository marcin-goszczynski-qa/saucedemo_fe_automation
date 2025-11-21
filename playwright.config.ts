import { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
  timeout: 60 * 1000,
  retries: 2,
  testDir: 'tests/e2e',
  reporter: 'html',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  globalSetup: require.resolve('./config/globalSetup'),
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
      grepInvert: /@visual/,
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
      grepInvert: /@visual/,
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
      grepInvert: /@visual/,
    },
    {
      name: 'visual',
      use: { browserName: 'chromium', headless: false },
      grep: /@visual/,
    },
  ],
};

export default config;
