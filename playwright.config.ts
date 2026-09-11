import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL;

if (!baseURL) {
  throw new Error('BASE_URL is not set. Add it to a local .env file.');
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  use: {
    baseURL,
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
      name: 'login-chromium',
      testMatch: /login\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'login-firefox',
      testMatch: /login\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'login-webkit',
      testMatch: /login\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'products-chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      testIgnore: [/checkout\.spec\.ts/, /login\.spec\.ts/, /cart\.spec\.ts/],
      dependencies: ['setup-auth'],
    },
    {
      name: 'products-firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      testIgnore: [/checkout\.spec\.ts/, /login\.spec\.ts/, /cart\.spec\.ts/],
      dependencies: ['setup-auth'],
    },
    {
      name: 'products-webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json',
      },
      testIgnore: [/checkout\.spec\.ts/, /login\.spec\.ts/, /cart\.spec\.ts/],
      dependencies: ['setup-auth'],
    },

    {
      name: 'cart-chromium',
      testMatch: /cart\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/cart.json',
      },
      dependencies: ['setup-cart'],
    },
    {
      name: 'cart-firefox',
      testMatch: /cart\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/cart.json',
      },
      dependencies: ['setup-cart'],
    },
    {
      name: 'cart-webkit',
      testMatch: /cart\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/cart.json',
      },
      dependencies: ['setup-cart'],
    },

    {
      name: 'checkout-chromium',
      testMatch: /checkout\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/cart.json',
      },
      dependencies: ['setup-cart'],
    },
    {
      name: 'checkout-firefox',
      testMatch: /checkout\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/cart.json',
      },
      dependencies: ['setup-cart'],
    },
    {
      name: 'checkout-webkit',
      testMatch: /checkout\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/cart.json',
      },
      dependencies: ['setup-cart'],
    },
  ],
});
