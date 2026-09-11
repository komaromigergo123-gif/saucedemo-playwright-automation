import { test, expect } from '../fixtures/pages';

test('returns a 500 error for an API request with page.route', async ({
  page,
  productsPage,
}) => {
  await page.route('**/api/products', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Products service unavailable' }),
    });
  });

  await productsPage.goto();

  const response = await page.evaluate(async () => {
    const apiResponse = await fetch(`${location.origin}/api/products`);

    return {
      status: apiResponse.status,
      ok: apiResponse.ok,
    };
  });

  expect(response.status).toBe(500);
  expect(response.ok).toBe(false);
});