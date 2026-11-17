import { test, expect } from '../../fixtures';
import { opportunityData, invalidOpportunityData, accountData } from '../../../src/fixtures/test-data.factory';

/**
 * Opportunity Management Tests (12-15)
 * Covers opportunity creation, account association, stage update, and persistence.
 */
test.describe('Opportunity Management', () => {

  test('TC-12: Create an Opportunity @smoke @regression', async ({ opportunityPage, accountPage, auth }) => {
    const account = accountData();
    const opp = opportunityData({ account: account.name });

    await auth.login();
    await accountPage.gotoAccountsTab();
    await accountPage.clickNew();
    await accountPage.fillAccountForm(account);
    await accountPage.save();
    expect(accountPage.accountExists(account.name)).toBeTruthy();

    await opportunityPage.gotoOpportunitiesTab();
    await opportunityPage.clickNew();
    await opportunityPage.fillOpportunityForm(opp);
    await opportunityPage.save();
    expect(opportunityPage.opportunityExists(opp.name)).toBeTruthy();
  });

  test('TC-13: Associate Opportunity with correct Account @regression', async ({ opportunityPage, accountPage, auth }) => {
    const account = accountData();
    const opp = opportunityData({ account: account.name });

    await auth.login();
    await accountPage.gotoAccountsTab();
    await accountPage.clickNew();
    await accountPage.fillAccountForm(account);
    await accountPage.save();

    await opportunityPage.gotoOpportunitiesTab();
    await opportunityPage.clickNew();
    await opportunityPage.fillOpportunityForm(opp);
    await opportunityPage.save();
    expect(opportunityPage.opportunityExists(opp.name)).toBeTruthy();

    // Verify account association on opportunity detail
    await opportunityPage.openOpportunity(opp.name);
    const accountField = opportunityPage.page.locator(`text=${account.name}`);
    await expect(accountField.first()).toBeVisible();
  });

  test('TC-14: Update Opportunity Stage @regression', async ({ opportunityPage, auth }) => {
    const opp = opportunityData();
    await auth.login();
    await opportunityPage.gotoOpportunitiesTab();
    await opportunityPage.clickNew();
    await opportunityPage.fillOpportunityForm(opp);
    await opportunityPage.save();
    expect(opportunityPage.opportunityExists(opp.name)).toBeTruthy();

    // Update stage
    await opportunityPage.updateStage(opp.name, 'Qualification');
    expect(opportunityPage.opportunityExists(opp.name)).toBeTruthy();
  });

  test('TC-15: Verify Opportunity details and persistence @regression', async ({ opportunityPage, auth }) => {
    const opp = opportunityData();
    await auth.login();
    await opportunityPage.gotoOpportunitiesTab();
    await opportunityPage.clickNew();
    await opportunityPage.fillOpportunityForm(opp);
    await opportunityPage.save();
    expect(opportunityPage.opportunityExists(opp.name)).toBeTruthy();

    // Open and verify details
    await opportunityPage.openOpportunity(opp.name);
    const nameField = opportunityPage.page.locator(`text=${opp.name}`);
    await expect(nameField.first()).toBeVisible();

    // Refresh and verify persistence
    await opportunityPage.page.reload();
    await opportunityPage.waitForPageLoad();
    await opportunityPage.searchOpportunity(opp.name);
    expect(opportunityPage.opportunityExists(opp.name)).toBeTruthy();
  });

  test('TC-16: Validate mandatory fields for Opportunity @regression', async ({ opportunityPage, auth }) => {
    await auth.login();
    await opportunityPage.gotoOpportunitiesTab();
    await opportunityPage.clickNew();
    await opportunityPage.fillOpportunityForm(invalidOpportunityData());
    await opportunityPage.save();
    const error = await opportunityPage.getValidationError();
    expect(error).not.toBeNull();
  });

});
