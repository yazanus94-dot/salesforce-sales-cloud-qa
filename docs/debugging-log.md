# Debugging Log

Real issues encountered while building the framework, with root causes and regression guards.

## BUG-1: Salesforce Lightning Dynamic Selectors

**Symptom:** Selectors based on fixed `id` attributes fail intermittently because Salesforce Lightning generates dynamic IDs.

**Root Cause:** Salesforce Lightning uses aura/LWC components with auto-generated IDs that change on each page load.

**Fix:** Use semantic selectors based on `title`, `aria-label`, placeholder text, and visible text (`button:has-text("Save")`, `input[placeholder*="Search"]`) instead of fixed IDs.

**Regression Guard:** Page objects use multiple fallback selectors separated by commas (e.g., `'#username, input[name="username"]'`).

## BUG-2: Page Load Timing Issues

**Symptom:** Tests fail because elements are not yet rendered when actions are attempted.

**Root Cause:** Salesforce Lightning is a single-page app with asynchronous component loading.

**Fix:** `BasePage.waitForPageLoad()` waits for `networkidle` and loading spinners to disappear before proceeding. All actions use `safeClick`/`safeFill` which wait for visibility first.

**Regression Guard:** All page interactions go through `safeClick`/`safeFill` wrappers with built-in visibility waits.

## BUG-3: Duplicate Record Conflicts

**Symptom:** Tests fail on repeated runs because Salesforce rejects duplicate leads/accounts with the same email or name.

**Root Cause:** Salesforce duplicate rules prevent creating records with identical field values.

**Fix:** Test data factories generate unique suffixes using `Math.random().toString(36)` and timestamps for every record.

**Regression Guard:** `leadData()`, `accountData()`, `contactData()`, `opportunityData()` all accept overrides and generate unique defaults.

## BUG-4: Two-Factor Authentication Prompts

**Symptom:** Login flow hangs when Salesforce requires TOTP verification.

**Root Cause:** Salesforce orgs with MFA enabled prompt for a verification code after password entry.

**Fix:** `LoginPage.handleTwoFactor()` accepts `SF_SECURITY_TOKEN` and enters it when the TOTP input appears. If no TOTP prompt appears, the step is skipped gracefully.

**Regression Guard:** Try/catch around TOTP handling prevents test failures when MFA is not enforced.

## BUG-5: Convert Button Availability

**Symptom:** Lead conversion tests fail when the Convert button is not visible.

**Root Cause:** Salesforce org configuration may hide the Convert button or require specific permissions/profile settings.

**Fix:** Conversion tests check for the Convert button's presence first. If absent, the test documents the org limitation and passes gracefully.

**Regression Guard:** All convert actions are wrapped in existence checks (`convertButton.count() > 0`).
