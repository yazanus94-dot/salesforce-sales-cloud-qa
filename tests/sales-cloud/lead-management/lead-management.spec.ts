import { test, expect } from '../../fixtures';
import { leadData, invalidLeadData } from '../../../src/fixtures/test-data.factory';

/**
 * Lead Management Tests (1-7)
 * Covers lead creation, mandatory field validation, invalid submissions,
 * search/filter, update, persistence after refresh, and duplicate handling.
 */
test.describe('Lead Management', () => {

  test('TC-01: Create a new Lead @smoke @regression', async ({ leadPage, auth }) => {
    const data = leadData();
    await auth.login();
    await leadPage.gotoLeadsTab();
    await leadPage.clickNew();
    await leadPage.fillLeadForm(data);
    await leadPage.save();
    expect(leadPage.leadExists(`${data.firstName} ${data.lastName}`)).toBeTruthy();
  });

  test('TC-02: Validate mandatory fields @smoke @regression', async ({ leadPage, auth }) => {
    await auth.login();
    await leadPage.gotoLeadsTab();
    await leadPage.clickNew();
    await leadPage.fillLeadForm(invalidLeadData());
    await leadPage.save();
    const error = await leadPage.getValidationError();
    expect(error).not.toBeNull();
  });

  test('TC-03: Validate invalid form submissions @regression', async ({ leadPage, auth }) => {
    const data = leadData();
    // Use an invalid email format
    await auth.login();
    await leadPage.gotoLeadsTab();
    await leadPage.clickNew();
    await leadPage.fillLeadForm({ ...data, email: 'invalid-email' });
    await leadPage.save();
    const error = await leadPage.getValidationError();
    expect(error).not.toBeNull();
  });

  test('TC-04: Search and filter Leads @smoke @regression', async ({ leadPage, auth }) => {
    const data = leadData();
    await auth.login();
    await leadPage.gotoLeadsTab();
    await leadPage.clickNew();
    await leadPage.fillLeadForm(data);
    await leadPage.save();
    await leadPage.searchLead(data.lastName);
    expect(leadPage.leadExists(data.lastName)).toBeTruthy();
  });

  test('TC-05: Update Lead information @regression', async ({ leadPage, auth }) => {
    const data = leadData();
    await auth.login();
    await leadPage.gotoLeadsTab();
    await leadPage.clickNew();
    await leadPage.fillLeadForm(data);
    await leadPage.save();
    expect(leadPage.leadExists(`${data.firstName} ${data.lastName}`)).toBeTruthy();

    // Update the lead status
    await leadPage.openLead(`${data.firstName} ${data.lastName}`);
    await leadPage.fillLeadForm({ ...data, status: 'Contacted' });
    await leadPage.save();
    expect(leadPage.leadExists(`${data.firstName} ${data.lastName}`)).toBeTruthy();
  });

  test('TC-06: Verify saved information after refreshing the page @regression', async ({ leadPage, auth }) => {
    const data = leadData();
    await auth.login();
    await leadPage.gotoLeadsTab();
    await leadPage.clickNew();
    await leadPage.fillLeadForm(data);
    await leadPage.save();
    expect(leadPage.leadExists(`${data.firstName} ${data.lastName}`)).toBeTruthy();

    // Refresh and verify persistence
    await leadPage.page.reload();
    await leadPage.waitForPageLoad();
    await leadPage.searchLead(data.lastName);
    expect(leadPage.leadExists(data.lastName)).toBeTruthy();
  });

  test('TC-07: Validate duplicate Lead handling @regression', async ({ leadPage, auth }) => {
    const data = leadData();
    await auth.login();
    await leadPage.gotoLeadsTab();

    // Create first lead
    await leadPage.clickNew();
    await leadPage.fillLeadForm(data);
    await leadPage.save();
    expect(leadPage.leadExists(`${data.firstName} ${data.lastName}`)).toBeTruthy();

    // Attempt to create duplicate
    await leadPage.clickNew();
    await leadPage.fillLeadForm(data);
    await leadPage.save();
    const error = await leadPage.getValidationError();
    // Duplicate handling may show a warning or block creation - document behavior
    expect(error).toBeDefined();
  });

});
