# Jira QA Management Templates — Salesforce Sales Cloud QA Automation Framework

This directory contains Jira-ready templates for managing QA execution, defects, and traceability for the Salesforce Sales Cloud and Service Cloud automation projects.

## Contents

| File | Purpose |
|------|---------|
| `test-case-template.csv` | Jira-ready CSV template for test case creation/import |
| `example-test-cases.csv` | Example records covering the 39 automated test scenarios |
| `defect-report-template.md` | Defect report template (severity/priority classification, steps to reproduce, expected vs actual) |
| `traceability-matrix.md` | Requirements-to-test traceability (see `../requirements-traceability-matrix.md`) |

---

## 1. Test Case Template (`test-case-template.csv`)

Copy this into Jira (or a test management tool) as the standard test case structure.

```csv
TestCaseID,RequirementID,TestName,TestDescription,Category,Priority,Tag,Preconditions,TestSteps,ExpectedResult,ActualResult,Status,ExecutedBy,ExecutionDate,Environment,DefectID,Notes
TC-01,RM-01,Create a new Lead,Create a new Lead with valid data.,Sales Cloud Lead Management,High,@smoke,@regression,"Valid Salesforce credentials; Lead tab accessible","1. Navigate to Leads tab.\n2. Click New.\n3. Fill mandatory fields.\n4. Click Save.","Lead record created and visible in Leads list.",,Not Executed,,,,Sandbox,
TC-02,RM-02,Validate mandatory fields,Submit lead form with missing required fields.,Sales Cloud Lead Management,High,@regression,,"1. Navigate to Leads tab.\n2. Click New.\n3. Submit form with required fields empty.","Salesforce displays validation error for each missing field.",,Not Executed,,,,Sandbox,
```

### Field descriptions

| Field | Description |
|-------|-------------|
| `TestCaseID` | Unique test case identifier (TC-01 … TC-16, SC-01 … SC-12, API-01 … API-09, INT-01 … INT-02) |
| `RequirementID` | Linked requirement (RM-01 … RM-39) |
| `TestName` | Short business-readable test name |
| `TestDescription` | What the test validates |
| `Category` | Business process area (Sales Cloud, Service Cloud, REST API, Integration) |
| `Priority` | Critical / High / Medium / Low |
| `Tag` | `@smoke` and/or `@regression` |
| `Preconditions` | Setup required before execution |
| `TestSteps` | Numbered execution steps |
| `ExpectedResult` | Expected business outcome |
| `ActualResult` | Observed outcome (filled during execution) |
| `Status` | Not Executed / Pass / Fail / Skipped / Blocked |
| `ExecutedBy` | QA engineer who executed |
| `ExecutionDate` | Date/time of execution |
| `Environment` | Sandbox / Developer / Production-readonly |
| `DefectID` | Linked Jira defect key (if failed) |
| `Notes` | Additional observations |

---

## 2. Example Test Cases (`example-test-cases.csv`)

Representative records for the automated suite. Import these as sample issues or use them as the source of truth for traceability.

```csv
TestCaseID,RequirementID,TestName,TestDescription,Category,Priority,Tag,Preconditions,TestSteps,ExpectedResult,ActualResult,Status,ExecutedBy,ExecutionDate,Environment,DefectID,Notes
TC-01,RM-01,Create a new Lead,Create a new Lead with valid data.,Sales Cloud Lead Management,High,@smoke,@regression,"Valid credentials; Leads tab accessible","1. Navigate to Leads.\n2. Click New.\n3. Fill mandatory fields.\n4. Click Save.","Lead created and visible in Leads list.",,Not Executed,,,Sandbox,
TC-08,RM-08,Convert a qualified Lead,Convert a lead and verify status change.,Sales Cloud Lead Conversion,High,@smoke,@regression,"Qualified Lead exists; Convert permission","1. Open lead record.\n2. Click Convert.\n3. Map Account/Contact.\n4. Confirm conversion.","Lead status = Converted; Account/Contact created.",,Not Executed,,,Sandbox,
TC-12,RM-12,Create an Opportunity,Create an Opportunity associated with an Account.,Sales Cloud Opportunity Management,High,@smoke,@regression,"Account exists","1. Navigate to Opportunities.\n2. Click New.\n3. Select Account.\n4. Set Stage, Close Date.\n5. Save.","Opportunity created and linked to Account.",,Not Executed,,,Sandbox,
SC-01,RM-17,Create a new Case,Create a new Case with valid data via Service Cloud UI.,Service Cloud Case Management,High,@smoke,@regression,"Valid credentials; Cases tab accessible","1. Navigate to Cases.\n2. Click New.\n3. Fill mandatory fields.\n4. Click Save.","Case created and visible in Cases list.",,Not Executed,,,Sandbox,
API-01,RM-29,Salesforce OAuth authentication,Authenticate via OAuth 2.0 username-password flow.,REST API,High,@regression,"Connected App credentials configured","1. Call /services/oauth2/token.\n2. Provide username, password, client_id, client_secret.","Access token returned with valid instance URL.",,Not Executed,,,Sandbox,
INT-01,RM-38,Create via API → verify via SOQL → update via API → confirm in UI,End-to-end UI/API integration flow for Case management.,UI/API Integration,High,@smoke,@regression,"API + UI credentials configured","1. Create Case via REST API.\n2. Query Case via SOQL.\n3. Update Case via API.\n4. Confirm in UI.","Case created, queried, updated, and visible in UI.",,Not Executed,,,Sandbox,
```

---

## 3. Defect Report Template (`defect-report-template.md`)

Use this template when logging defects in Jira. Every field should be completed before a defect is triaged.

```markdown
# [DEFECT] <Short, descriptive title>

**Jira Key:** <PROJ-###>  
**Reported By:** <QA Engineer Name>  
**Reported On:** <YYYY-MM-DD>  
**Environment:** <Sandbox | Developer | Production-readonly>  
**Browser:** <Chromium | Firefox | WebKit>  
**Build/Commit:** <git commit SHA>  

## Severity / Priority

| Field | Value |
|-------|-------|
| Severity | <Critical | High | Medium | Low> |
| Priority | <P0 | P1 | P2 | P3> |

**Severity definitions:**
- **Critical:** Data loss, security exposure, core business process blocked, no workaround.
- **High:** Major feature broken, significant workaround available.
- **Medium:** Feature partially broken, limited impact.
- **Low:** Cosmetic issue, no functional impact.

**Priority definitions:**
- **P0:** Fix immediately; blocks release.
- **P1:** Fix before next release.
- **P2:** Fix in upcoming release.
- **P3:** Fix when capacity permits.

## Test Case Reference

- **Test Case ID:** <TC-XX | SC-XX | API-XX | INT-XX>
- **Requirement ID:** <RM-XX>
- **Automated:** <Yes | No>
- **Executed via:** <CI run | Manual | Local>

## Steps to Reproduce

1. <Step 1>
2. <Step 2>
3. <Step 3>

## Expected Result

<What should happen per the test case / requirement>

## Actual Result

<What actually happened>

## Evidence

- **Screenshot:** `<filename.png>` (attached)
- **Trace:** `<trace.zip>` (attached, Playwright `trace: retain-on-failure`)
- **Video:** `<video.webm>` (attached, Playwright `video: retain-on-failure`)
- **Console logs:** `<logs.txt>` (if relevant)
- **JUnit XML:** `<junit-XXXX.xml>` (if CI run)

## Root Cause (pending triage)

<To be filled after investigation>

## Suggested Fix

<Optional: suggested remediation>

## Linked Issues

- **Blocks:** <Jira keys>
- **Blocked by:** <Jira keys>
- **Related to:** <Jira keys>

## Status

<Open | In Progress | Resolved | Closed | Reopened>
```

---

## 4. Severity & Priority Classification Guide

| Severity | When to use |
|----------|-------------|
| Critical | Lead-to-Opportunity or Case Management cannot be completed; data integrity risk; auth/Security issue |
| High | A core test case (smoke) fails; mandatory field validation broken; API returns 5xx |
| Medium | A regression (non-smoke) test fails; UI glitch; performance degradation |
| Low | Cosmetic/UI text issue; non-blocking edge case |

| Priority | SLA | When to use |
|----------|-----|-------------|
| P0 | 24h | Production-blocking, security, data loss |
| P1 | 3 days | Core feature broken, release blocker |
| P2 | Next release | Degraded but functional |
| P3 | Backlog | Cosmetic, enhancement |

---

## 5. Requirements-to-Test Traceability

The full traceability matrix (39 requirements → 39 test cases) lives at `../requirements-traceability-matrix.md`. Every automated test case maps to exactly one requirement; every requirement is covered by at least one test case (100% coverage).

**Traceability rules:**
- One test case → one requirement (unless a combined flow is technically justified).
- A failed test case must link to its requirement via `RequirementID` and to any defect via `DefectID`.
- CI uploads JUnit XML and HTML reports so execution status can be reconciled against the traceability matrix.
