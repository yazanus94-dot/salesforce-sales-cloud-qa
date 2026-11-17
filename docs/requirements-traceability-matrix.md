# Requirements-to-Test Traceability Matrix

| Requirement ID | Requirement Description | Test Case ID | Test Description | Status |
|----------------|------------------------|--------------|------------------|--------|
| RM-01 | Create a new Lead | TC-01 | Create a new Lead with valid data | ✅ Implemented |
| RM-02 | Validate mandatory fields | TC-02 | Submit lead form with missing required fields | ✅ Implemented |
| RM-03 | Validate invalid form submissions | TC-03 | Submit lead with invalid email format | ✅ Implemented |
| RM-04 | Search and filter Leads | TC-04 | Search for a lead by name after creation | ✅ Implemented |
| RM-05 | Update Lead information | TC-05 | Update lead status and verify changes | ✅ Implemented |
| RM-06 | Verify persistence after refresh | TC-06 | Refresh page and verify lead data persists | ✅ Implemented |
| RM-07 | Validate duplicate Lead handling | TC-07 | Attempt to create a duplicate lead | ✅ Implemented |
| RM-08 | Convert a qualified Lead | TC-08 | Convert a lead and verify status change | ✅ Implemented |
| RM-09 | Verify Account creation/linking | TC-09 | Verify Account is created or linked after conversion | ✅ Implemented |
| RM-10 | Verify Contact creation/linking | TC-10 | Verify Contact is created or linked after conversion | ✅ Implemented |
| RM-11 | Verify converted Lead status | TC-11 | Verify converted Lead shows "Converted" status | ✅ Implemented |
| RM-12 | Create an Opportunity | TC-12 | Create an Opportunity associated with an Account | ✅ Implemented |
| RM-13 | Associate Opportunity with Account | TC-13 | Verify Opportunity is linked to correct Account | ✅ Implemented |
| RM-14 | Update Opportunity Stage | TC-14 | Update opportunity stage and verify persistence | ✅ Implemented |
| RM-15 | Verify Opportunity details | TC-15 | Open opportunity and verify details persist after refresh | ✅ Implemented |
| RM-16 | Validate Opportunity mandatory fields | TC-16 | Submit opportunity form with missing required fields | ✅ Implemented |

## Project 2 — Service Cloud Case Management (SC-01 to SC-12)

| Requirement ID | Requirement Description | Test Case ID | Test Description | Status |
|----------------|------------------------|--------------|------------------|--------|
| RM-17 | Create a new Case | SC-01 | Create a new Case with valid data via Service Cloud UI | ✅ Implemented |
| RM-18 | Validate mandatory fields | SC-02 | Submit case form with missing required fields | ✅ Implemented |
| RM-19 | Validate invalid Case submissions | SC-03 | Submit case with invalid data | ✅ Implemented |
| RM-20 | Update Case information | SC-04 | Update case fields and verify changes | ✅ Implemented |
| RM-21 | Change Case priority | SC-05 | Change case priority and verify persistence | ✅ Implemented |
| RM-22 | Assign Case to agent/queue | SC-06 | Assign case to an agent or queue | ✅ Implemented |
| RM-23 | Change Case status | SC-07 | Change case status and verify persistence | ✅ Implemented |
| RM-24 | Close a Case | SC-08 | Close a case and verify | ✅ Implemented |
| RM-25 | Reopen a Case | SC-09 | Reopen a closed case when supported | ✅ Implemented |
| RM-26 | Search and retrieve Cases | SC-10 | Search for a case by subject/number | ✅ Implemented |
| RM-27 | Verify data persistence after refresh | SC-11 | Refresh page and verify case data persists | ✅ Implemented |
| RM-28 | Test access restrictions | SC-12 | Verify case access restrictions and permissions | ✅ Implemented |

## Project 2 — Salesforce REST API (API-01 to API-09)

| Requirement ID | Requirement Description | Test Case ID | Test Description | Status |
|----------------|------------------------|--------------|------------------|--------|
| RM-29 | Salesforce OAuth authentication | API-01 | Authenticate via OAuth 2.0 username-password flow | ✅ Implemented |
| RM-30 | Retrieve Case records via REST API | API-02 | Query Case records via Salesforce REST API | ✅ Implemented |
| RM-31 | Create a Case via REST API | API-03 | Create a Case via Salesforce REST API | ✅ Implemented |
| RM-32 | Update Case via API | API-04 | Update Case priority and status via API | ✅ Implemented |
| RM-33 | Retrieve record by ID via API | API-05 | Retrieve a single Case record by ID | ✅ Implemented |
| RM-34 | Validate invalid API requests | API-06 | Verify handling of invalid API requests | ✅ Implemented |
| RM-35 | Validate response codes and data | API-07 | Verify API response codes and data structure | ✅ Implemented |
| RM-36 | Verify data consistency API vs UI | API-08 | Verify data consistency between API and UI | ✅ Implemented |
| RM-37 | Retrieve records via SOQL | API-09 | Execute SOQL queries via REST API | ✅ Implemented |

## Project 2 — UI/API Integration (INT-01 to INT-02)

| Requirement ID | Requirement Description | Test Case ID | Test Description | Status |
|----------------|------------------------|--------------|------------------|--------|
| RM-38 | Create via API → verify via SOQL → update via API → confirm in UI | INT-01 | End-to-end UI/API integration flow for Case management | ✅ Implemented |
| RM-39 | Create via UI → verify via API | INT-02 | Cross-verification: UI-created Case verified via API | ✅ Implemented |

## Coverage Summary

- **Project 1 — Sales Cloud Requirements:** 16 (RM-01 to RM-16)
- **Project 2 — Service Cloud Requirements:** 12 (RM-17 to RM-28)
- **Project 2 — REST API Requirements:** 9 (RM-29 to RM-37)
- **Project 2 — Integration Requirements:** 2 (RM-38 to RM-39)
- **Total Requirements:** 39
- **Implemented Test Cases:** 39 (100%)
- **Smoke Tests:** 8 (TC-01, TC-02, TC-08, TC-12, SC-01, SC-02, SC-10, INT-01)
- **Regression Tests:** 39 (all test cases tagged @regression)
