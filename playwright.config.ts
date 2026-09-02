import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  reporter: [['html', { open: 'on-failure' }]],

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
      name: 'login',
      testMatch: /login\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      testIgnore: [/checkout\.spec\.ts/, /login\.spec\.ts/],
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