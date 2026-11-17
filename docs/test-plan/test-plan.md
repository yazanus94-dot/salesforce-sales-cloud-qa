# Service Cloud Test Plan

## Overview
This test plan covers Project 2 — Salesforce Service Cloud and API Automation Testing — an extension of the Project 1 Salesforce Sales Cloud QA Automation Framework.

**Scope:** Service Cloud Case Management UI, Salesforce REST API, UI/API integration, Postman/Newman validation, and SQL traceability store.

**Framework:** Playwright Test with Chromium (primary), Firefox/WebKit (optional), TypeScript.

**Author:** Automated QA Framework (Project 2)

**Date:** 2024

---

## 1. Test Objectives
1. Verify Case creation, update, priority/status change, assignment, close, and reopen in Salesforce Service Cloud UI.
2. Validate mandatory field handling and invalid submission behavior.
3. Verify Salesforce REST API authentication, Case CRUD, SOQL queries, and response validation.
4. Validate end-to-end UI/API integration flows.
5. Capture test execution results in a PostgreSQL traceability store.
6. Provide Newman/Postman collection for API smoke testing.

---

## 2. Test Environment

| Item | Value |
|------|-------|
| Target Application | Salesforce Service Cloud (Lightning Experience) |
| Test Runner | Playwright Test |
| Browser Projects | Chromium (primary), Firefox, WebKit (optional) |
| Language | TypeScript |
| API Client | Playwright `request` + custom `SalesforceAPIClient` |
| Auth | Salesforce OAuth 2.0 username-password flow |
| Credentials | Environment variables only (`.env`, never committed) |
| Data Store | PostgreSQL (traceability schema in `sql/schema.sql`) |
| API Smoke Tests | Postman collection + Newman |

---

## 3. Test Cases

### 3.1 Service Cloud Case Management UI (SC-01 to SC-12)

| ID | Test | Type | Tags | Priority | File |
|----|------|------|------|----------|------|
| SC-01 | Create a new Case | UI | smoke, regression | critical | `tests/service-cloud/case-management.spec.ts` |
| SC-02 | Validate mandatory fields | UI | smoke, regression | high | `tests/service-cloud/case-management.spec.ts` |
| SC-03 | Verify invalid Case submissions | UI | regression | medium | `tests/service-cloud/case-management.spec.ts` |
| SC-04 | Update Case information | UI | regression | high | `tests/service-cloud/case-management.spec.ts` |
| SC-05 | Change Case priority | UI | regression | medium | `tests/service-cloud/case-management.spec.ts` |
| SC-06 | Assign Case to agent/queue | UI | regression | medium | `tests/service-cloud/case-management.spec.ts` |
| SC-07 | Change Case status | UI | regression | medium | `tests/service-cloud/case-management.spec.ts` |
| SC-08 | Close a Case | UI | regression | high | `tests/service-cloud/case-management.spec.ts` |
| SC-09 | Reopen a Case when supported | UI | regression | medium | `tests/service-cloud/case-management.spec.ts` |
| SC-10 | Search and retrieve Cases | UI | smoke, regression | high | `tests/service-cloud/case-management.spec.ts` |
| SC-11 | Verify data persistence after page refresh | UI | regression | medium | `tests/service-cloud/case-management.spec.ts` |
| SC-12 | Test access restrictions and permissions | UI | regression | medium | `tests/service-cloud/case-management.spec.ts` |

### 3.2 Salesforce REST API (API-01 to API-09)

| ID | Test | Type | Tags | Priority | File |
|----|------|------|------|----------|------|
| API-01 | Salesforce OAuth authentication | API | regression | critical | `tests/api/rest-api.spec.ts` |
| API-02 | Retrieve Case records via REST API | API | regression | high | `tests/api/rest-api.spec.ts` |
| API-03 | Create a Case via REST API | API | regression | high | `tests/api/rest-api.spec.ts` |
| API-04 | Update Case priority and status via API | API | regression | high | `tests/api/rest-api.spec.ts` |
| API-05 | Retrieve records by ID via API | API | regression | medium | `tests/api/rest-api.spec.ts` |
| API-06 | Validate invalid requests | API | regression | medium | `tests/api/rest-api.spec.ts` |
| API-07 | Validate response codes and response data | API | regression | high | `tests/api/rest-api.spec.ts` |
| API-08 | Verify data consistency between API and UI | API | regression | medium | `tests/api/rest-api.spec.ts` |
| API-09 | Retrieve Salesforce records through SOQL | API | regression | medium | `tests/api/rest-api.spec.ts` |

### 3.3 UI/API Integration (INT-01 to INT-04)

| ID | Test | Type | Tags | Priority | File |
|----|------|------|------|----------|------|
| INT-01 | Create via API → SOQL → update via API → confirm in UI | Integration | smoke, regression | critical | `tests/integration/ui-api-integration.spec.ts` |
| INT-02 | Create via UI → verify via API | Integration | regression | high | `tests/integration/ui-api-integration.spec.ts` |

---

## 4. Entry Criteria
- Salesforce org accessible with Service Cloud Cases enabled.
- Connected App configured with OAuth 2.0 username-password flow.
- Environment variables set: `SF_CONNECTED_APP_CLIENT_ID`, `SF_CONNECTED_APP_CLIENT_SECRET`, `SF_USERNAME`, `SF_PASSWORD`, `SF_SECURITY_TOKEN`.
- Playwright browsers installed (`npx playwright install`).
- PostgreSQL instance available for traceability store (optional).

---

## 5. Exit Criteria
- All smoke-tagged tests pass against the target org.
- No P1/P2 defects open from this test cycle.
- API tests execute successfully (when credentials available) or are documented as pending.
- Traceability store populated with execution results (when PostgreSQL available).

---

## 6. Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Dynamic Salesforce Lightning selectors may break | Use `safeClick`/`safeFill` from `BasePage` with retry and fallback |
| OAuth credentials not available | API tests document as pending; structure validated without live calls |
| Case close/reopen not enabled in org | Tests guard for button presence and document org configuration differences |
| Flaky test execution due to network latency | Retry logic in page objects; `waitForPageLoad` after navigation |
| Credential exposure | `.env` gitignored; only `.env.example` tracked |

---

## 7. Deliverables
1. `src/pages/case.page.ts` — Service Cloud Case page object
2. `src/api/salesforce-client.ts` — Salesforce REST API client (OAuth, CRUD, SOQL)
3. `tests/service-cloud/case-management.spec.ts` — 12 UI test scenarios
4. `tests/api/rest-api.spec.ts` — 9 REST API test scenarios
5. `tests/integration/ui-api-integration.spec.ts` — Integration test scenarios
6. `postman/collections/Salesforce-Service-Cloud.postman_collection.json` — Postman collection
7. `postman/environments/Salesforce-Service-Cloud.postman_environment.json` — Postman environment
8. `postman/newman-config.json` — Newman CLI configuration
9. `sql/schema.sql` — PostgreSQL traceability schema
10. `docs/test-plan/test-plan.md` — This document
11. `docs/test-cases/` — Test case details (traceability)

---

## 8. Test Execution

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run Service Cloud UI tests (Chromium)
npx playwright test tests/service-cloud/

# Run API tests
npx playwright test tests/api/

# Run integration tests
npx playwright test tests/integration/

# Run all Project 2 tests
npx playwright test tests/service-cloud/ tests/api/ tests/integration/

# Run Newman API smoke tests
npm run test:newman
```

---

## 9. Traceability
Test case traceability to requirements is maintained in `docs/traceability-matrix.md` and the PostgreSQL `test_cases` / `case_traceability` tables.
