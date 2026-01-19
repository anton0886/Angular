
# Blog — Angular template

A small starter template for an Angular application with pre-configured unit tests (Vitest), end-to-end tests (Playwright), code formatting (Prettier), and linting (ESLint).

**Key features**
- Modern Angular version
- Unit tests with `vitest`
- E2E tests with `@playwright/test`
- Formatting with `prettier` and pre-commit hooks via `husky` + `lint-staged`

## Requirements
- Node.js (recommended >= 18)
- npm

## Quick start
1. Install dependencies:

	npm install

2. Run the app in development mode:

	npm run start

3. Build the project (a prebuild script generates environment files):

	npm run build

## Scripts (from `package.json`)
- `npm run start` — runs `ng serve` for local development
- `npm run build` — builds the project (runs `prebuild` beforehand)
- `npm run test` — runs unit tests (`vitest run`)
- `npm run test:watch` — runs tests in watch mode
- `npm run e2e` — runs E2E tests (`playwright test`)
- `npm run lint` — runs ESLint
- `npm run format` — formats files using Prettier
- `npm run format:check` — checks formatting

## CI / Husky
`lint-staged` and `husky` are configured to auto-format and lint staged files before commits.

## Project structure (brief)
- `src/` — application source
  - `src/app/` — components, services and features
  - `src/assets/` — static assets
  - `environments/` — environment files

## Contributing
1. Create a branch for your work
2. Follow existing eslint/prettier rules
3. Open a pull request with a description of changes
