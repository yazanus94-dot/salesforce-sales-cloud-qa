# Design Decisions

Key engineering trade-offs made during the development of the Salesforce QA Automation Framework.

## D1 — Page Object Model (POM)

**Decision:** Use Page Object Model with a `BasePage` abstract class and dedicated page classes for Login, Lead, Account, Contact, and Opportunity.

**Rationale:** POM encapsulates Salesforce Lightning UI selectors in one place, making the framework maintainable when Salesforce updates its UI. Test code reads like business scenarios rather than DOM manipulations.

## D2 — Playwright Test Runner

**Decision:** Use Playwright Test with Chromium as the primary browser, with Firefox and WebKit as optional projects.

**Rationale:** Playwright provides auto-waiting, built-in traces, screenshots, and videos on failure. It supports modern web apps like Salesforce Lightning with Shadow DOM and dynamic components better than Selenium.

## D3 — Environment-Based Configuration

**Decision:** All credentials and URLs are stored in `.env` (not committed), with `.env.example` as a template.

**Rationale:** Prevents credential leakage in version control. Supports different environments (Developer Edition, Sandbox, Production) without code changes.

## D4 — Unique Synthetic Test Data

**Decision:** All test data is generated with random suffixes to avoid duplicate record conflicts in Salesforce.

**Rationale:** Salesforce enforces uniqueness on some fields (e.g., email). Randomized data enables parallel test execution and repeated runs without data cleanup.

## D5 — Smoke vs Regression Tagging

**Decision:** Tests are tagged with `@smoke` and `@regression` annotations for selective execution.

**Rationale:** Enables fast feedback on critical paths (smoke) and comprehensive validation (regression) in CI.

## D6 — No Live Salesforce Execution by Default

**Decision:** The framework structure is complete and validated, but live execution against Salesforce requires credentials that are not provided.

**Rationale:** Per the Definition of Done, live Salesforce execution is identified as pending when credentials are unavailable. No test results are fabricated.

## D7 — TypeScript Strict Mode

**Decision:** TypeScript strict mode enabled with `@playwright/test` types.

**Rationale:** Catches type errors at compile time, improving reliability of test code and IDE autocomplete for page objects.
