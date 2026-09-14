# SauceDemo Playwright Automation

End-to-end test suite for [saucedemo.com](https://www.saucedemo.com), built with [Playwright](https://playwright.dev/) and TypeScript. Built as a portfolio project to demonstrate test automation practices: Page Object Model, custom fixtures, data-driven tests, authenticated session reuse, and CI-driven smoke/regression pipelines.

## Tech stack

- **Playwright Test** (TypeScript)
- GitHub Actions CI (smoke on push/PR, nightly full regression)
- **Docker** containerization (`Dockerfile`, `docker-compose.yml`)
- **Jenkins** CI/CD Declarative Pipeline (`Jenkinsfile`)

## Project structure

```
data/         Test data (user credentials, checkout info)
pages/        Page Object Model classes for login, inventory, item details, cart, and checkout
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
- **Network mocking** – `network-mocking.spec.ts` uses `page.route` to return an HTTP 500 response for an API request.
- **Negative/edge case coverage** – locked-out user, invalid login, required-field validation on checkout.

## Running locally

```bash
npm ci
npx playwright install --with-deps
npm test
npm run test:headed
npm run test:smoke
npm run test:regression-cross-browser
npm run test:ui
npm run report
```

Create a local `.env` file with `BASE_URL` set to the test environment URL. The file is ignored by Git so environment-specific or sensitive URLs are not committed. A template is available in [.env.example](.env.example).

## Running with Docker

### Using Docker Compose

Build and run the default test suite:

```bash
docker compose up --build
```

Run specific test suites:

```bash
# Run smoke tests
docker compose run playwright npm run test:smoke

# Run full cross-browser regression
docker compose run playwright npm run test:regression-cross-browser
```

Test reports and traces are automatically mounted to `./playwright-report` and `./test-results` on the host.

### Using Docker CLI directly

```bash
docker build -t saucedemo-playwright .
docker run --rm --ipc=host -v "${PWD}/playwright-report:/app/playwright-report" -v "${PWD}/test-results:/app/test-results" saucedemo-playwright
```

## Jenkins CI Pipeline

The project includes a declarative [Jenkinsfile](Jenkinsfile) featuring:

- **Containerized execution** via official `mcr.microsoft.com/playwright` Docker image with `--ipc=host`
- **Parameterized builds**: Select test suites (`test`, `test:smoke`, `test:regression-cross-browser`) and custom `BASE_URL`
- **Parallel quality gates**: TypeScript type checking (`tsc --noEmit`) and linting (`eslint .`)
- **Automated test reporting**: Publishes JUnit XML results and interactive Playwright HTML report
- **Artifact archiving**: Persists test reports, traces, screenshots, and failure videos

## Roadmap / next steps

- [x] Model the cart page as its own POM
- [x] Model the item details page as its own POM
- [x] Cross-browser coverage (Firefox, WebKit) — smoke suite and nightly regression run on Chromium, Firefox, and WebKit; default `npm test` stays Chromium-only for speed
- [x] ESLint + Prettier for code quality consistency
- [x] Add `tsc --noEmit` type-check step to CI
- [x] Add `.env`/multi-environment config layering instead of hardcoded base URL
- [x] Add a `page.route` network mocking example
- [x] Add `list` reporter alongside `html` and `junit` for CI console and pipeline output
- [x] Docker & Jenkins pipeline integration
