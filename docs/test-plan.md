# Test Plan

## Scope

The Salesforce Sales Cloud QA Automation Framework validates the complete Lead-to-Opportunity business process:

1. **Lead Management** (TC-01 to TC-07): Create, validate, search, update, refresh persistence, duplicate handling
2. **Lead Conversion** (TC-08 to TC-11): Convert leads, verify Account/Contact creation/linking, verify converted status
3. **Opportunity Management** (TC-12 to TC-16): Create opportunities, associate accounts, update stages, verify persistence, mandatory field validation

## Test Categories

| Category | Tag | Description | Test Cases |
|----------|-----|-------------|------------|
| Smoke | `@smoke` | Critical path tests for fast feedback | TC-01, TC-02, TC-08, TC-12 |
| Regression | `@regression` | Comprehensive validation | TC-01 through TC-16 |

## Test Environment

- **Browser:** Chromium (primary), Firefox, WebKit (optional)
- **Environment:** Salesforce Developer Edition or Sandbox
- **Credentials:** Provided via `SF_USERNAME`, `SF_PASSWORD`, `SF_SECURITY_TOKEN` environment variables
- **Base URL:** `SF_BASE_URL` (defaults to `https://login.salesforce.com`)

## Execution Commands

```bash
# All tests
npm test

# Smoke tests only
npm run test:smoke

# Regression tests only
npm run test:regression

# UI mode
npm run test:ui

# View report
npm run test:report
```

## Pass/Fail Criteria

- **Pass:** All assertions pass, expected business outcome verified, no Salesforce errors
- **Fail:** Assertion fails, page element not found, Salesforce validation error displayed, unexpected navigation
- **Skip:** Salesforce org configuration limitation (e.g., Convert button not available)

## Reporting

Playwright HTML report is generated at `playwright-report/`. CI uploads the report as a GitHub Actions artifact.
