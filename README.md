# Gist Test Automation

Test automation project for GIST application.

- **API Testing:** Supertest + Vitest
- **UI Testing:** Playwright

### Pre-requisites

- Node.js
- Visual Studio Code

## Project structure

```
|-- .github/workflows/      # CI workflow
|-- config                  # Env Configuration
|-- src/
|  |-- api/
        |-- clients         # API client Endpoints
        |-- fixtures        # Shared fixtures
        |-- models          # Shared TypeScript types and interfaces
        |-- schemas         # API schemas
        |-- tests           # Test cases
        |-- utils           # Utilities
|  |-- ui/
        |-- fixtures        # Shared fixtures
        |-- pages           # Page Object Classes
        |-- tests           # Test cases
|-- package.json            # Package manager
|-- playwright.config.ts    # Playwright configuration
|-- vitest.config.ts.       # Vitest configuration
|-- README.md               # Project documentation
```

## Installation

- Source code is available at - [GitHub - gist-test-automation](https://github.com/vicky2293/gist-test-automation)
- To clone the project locally - "git clonehttps://github.com/vicky2293/gist-test-automation.git"
- After cloning the project, run command to install the dependencies

```bash
npm install
cp .env.example .env
```

Create a GitHub token with the permissions required for the Gists API and put it in `.env`

- Install the playwright browsers using command
  - `npx playwright install`

## Run tests

To run API tests:

```bash
npm run test:api
```

To run Playwright UI tests:

```bash
npm run test
```

To run Playwright tests in UI mode:

```bash
npm run test:ui
```

Tests can be executed against chrome browser - `npm run test:chrome`

TypeScript validation:

```bash
npm run check
```

```bash
npm run lint
```

## Continuous Integration - Github Actions

- This project is integrated with Github actions.
- Github actions workflow can be found [here](https://github.com/vicky2293/gist-test-automation/actions)

## SonarQube

- This project is integrated with Sonarcloud for quality check
- Sonarcloud: [Sonarcloud Report](https://sonarcloud.io/project/overview?id=vicky2293_gist-test-automation)

## FUTURE PLANS

### For API tests

- Rate-limit handling
- Parallel test execution
- Performance testing
- Test reporting
- Improve CI
- Docker support

### For UI tests

- Playwright-BDD/Cucumber (Based on project need)
- Parallel test execution
- Lighthouse check as part of CI pipeline
- UI + API Integration
- screenshot: only-on-failure
- Storage state support
- Hooks
- Report portal
- Improve CI
- Docker support
