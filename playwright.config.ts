import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  reporter: [['html', { open: 'never' }]],

  projects: [
    {
      name: 'setup-auth',
      testMatch: /auth\.setup\.ts/,
    },

    {
      name: 'setup-cart',
      testMatch: /cart\.setup\.ts/,
      use: {
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup-auth'],
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      testIgnore: /checkout\.spec\.ts/,
      dependencies: ['setup-auth'],
    },

    {
      name: 'checkout',
      testMatch: /checkout\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/checkout.json',
      },
      dependencies: ['setup-cart'],
    },
  ],
});