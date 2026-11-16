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

## Coverage Summary

- **Total Requirements:** 16
- **Implemented Test Cases:** 16 (100%)
- **Smoke Tests:** 4 (TC-01, TC-02, TC-08, TC-12)
- **Regression Tests:** 16 (TC-01 through TC-16)
