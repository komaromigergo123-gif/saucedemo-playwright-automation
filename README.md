# SauceDemo Playwright Automation

End-to-end test suite for [saucedemo.com](https://www.saucedemo.com), built with [Playwright](https://playwright.dev/) and TypeScript. Built as a portfolio project to demonstrate test automation practices: Page Object Model, custom fixtures, data-driven tests, authenticated session reuse, and CI-driven smoke/regression pipelines.

## Tech stack

- **Playwright Test** (TypeScript)
- GitHub Actions CI (smoke on push/PR, nightly full regression)

## Project structure

```
data/         Test data (user credentials, checkout info)
pages/        Page Object Model classes (LoginPage, ProductsPage, CheckoutPage)
fixtures/     Custom test/expect fixtures wiring page objects into tests
tests/        Spec files + setup projects for authenticated state
playwright.config.ts
```

## Key features demonstrated

- **Page Object Model** – all locators/actions encapsulated in `pages/`, injected via [fixtures/pages.ts](fixtures/pages.ts).
- **Session reuse via setup projects** – `auth.setup.ts`/`cart.setup.ts` log in once and save `storageState`, so downstream tests skip repeating login steps (faster, more realistic).
- **Data-driven tests** – credentials and checkout data centralized in `data/` instead of hardcoded in specs.
- **Tagged test runs** – `@smoke` tag marks critical-path tests, run independently via `npm run test:smoke`.
- **CI pipeline** – smoke suite runs on every push/PR; full regression runs nightly and on manual dispatch, with HTML report uploaded as an artifact.
- **File download verification** – checkout flow test downloads a generated PDF receipt and asserts its file signature.
- **Negative/edge case coverage** – locked-out user, invalid login, required-field validation on checkout.

## Running locally

```bash
npm ci
npx playwright install --with-deps   # installs Chromium, Firefox, WebKit
npm test                          # full suite, Chromium only, headless
npm run test:headed               # headed mode, Chromium only
npm run test:smoke                # @smoke tagged tests, Chromium + Firefox + WebKit
npm run test:regression-cross-browser  # full suite, Chromium + Firefox + WebKit
npm run test:ui                   # Playwright UI mode
npm run report                    # open last HTML report
```

## Roadmap / next steps

- [x] Model the cart page as its own POM (currently inlined in `products.spec.ts`)
- [x] Cross-browser coverage (Firefox, WebKit) — smoke suite and nightly regression run on Chromium, Firefox, and WebKit; default `npm test` stays Chromium-only for speed
- [x] ESLint + Prettier for code quality consistency
- [ ] Accessibility checks via `@axe-core/playwright`
- [ ] Visual regression baseline (`toHaveScreenshot`)
- [x] Fix `CheckoutPage.goto()` navigating to `/cart.html` instead of a real checkout URL
- [x] Add `tsc --noEmit` type-check step to CI
- [ ] Add `.env`/multi-environment config layering instead of hardcoded base URL
- [ ] Add an API-level test or `page.route` network mocking example
- [ ] Add `list` reporter alongside `html` for CI console output
- [ ] Use `test.step()` to group actions for more readable HTML reports
