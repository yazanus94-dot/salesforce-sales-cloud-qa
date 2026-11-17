import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * OpportunityPage - Salesforce Opportunity Management Page Object
 * Handles opportunity creation, stage updates, and account association.
 */
export class OpportunityPage extends BasePage {
  readonly newButton: Locator;
  readonly opportunityNameColumn: Locator;
  readonly searchInput: Locator;

  // Opportunity form fields
  readonly opportunityNameInput: Locator;
  readonly accountInput: Locator;
  readonly closeDateInput: Locator;
  readonly stageSelect: Locator;
  readonly amountInput: Locator;
  readonly probabilityInput: Locator;
  readonly typeSelect: Locator;
  readonly leadSourceSelect: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  // Validation
  readonly requiredFieldError: Locator;

  constructor(page: Page) {
    super(page);
    this.newButton = page.locator('button:has-text("New"), a:has-text("New")');
    this.opportunityNameColumn = page.locator(
      'th[title="Opportunity Name"], span[title*="Opportunity Name"]',
    );
    this.searchInput = page.locator(
      'input[placeholder*="Search"], input[name="Opportunity Name"]',
    );

    // Opportunity form fields
    this.opportunityNameInput = page.locator(
      'input[name="name"], input[id*="OpportunityName"]',
    );
    this.accountInput = page.locator('input[name="accountName"], input[id*="Account"]');
    this.closeDateInput = page.locator('input[name="closeDate"], input[id*="CloseDate"]');
    this.stageSelect = page.locator('select[name="stage"], input[name="Stage"]');
    this.amountInput = page.locator('input[name="amount"], input[id*="Amount"]');
    this.probabilityInput = page.locator(
      'input[name="probability"], input[id*="Probability"]',
    );
    this.typeSelect = page.locator('select[name="type"], input[name="Type"]');
    this.leadSourceSelect = page.locator(
      'select[name="leadSource"], input[name="LeadSource"]',
    );

    // Actions
    this.saveButton = page.locator('button:has-text("Save"), input[value="Save"]');
    this.cancelButton = page.locator('button:has-text("Cancel"), input[value="Cancel"]');

    // Validation
    this.requiredFieldError = page.locator('div.error, span.error, [role="alert"]');
  }

  /**
   * Navigate to the Opportunities tab.
   */
  async gotoOpportunitiesTab(): Promise<void> {
    await this.navigateToTab('Opportunities');
    await this.waitForPageLoad();
  }

  /**
   * Click the New button to open the opportunity creation form.
   */
  async clickNew(): Promise<void> {
    await this.safeClick(this.newButton);
    await this.waitForPageLoad();
  }

  /**
   * Fill the opportunity creation form.
   * @param data - Opportunity field values
   */
  async fillOpportunityForm(data: {
    name: string;
    account?: string;
    closeDate?: string;
    stage?: string;
    amount?: string;
    probability?: string;
    type?: string;
    leadSource?: string;
  }): Promise<void> {
    await this.safeFill(this.opportunityNameInput, data.name);
    if (data.account) {await this.safeFill(this.accountInput, data.account);}
    if (data.closeDate) {await this.safeFill(this.closeDateInput, data.closeDate);}
    if (data.stage) {await this.safeFill(this.stageSelect, data.stage);}
    if (data.amount) {await this.safeFill(this.amountInput, data.amount);}
    if (data.probability) {await this.safeFill(this.probabilityInput, data.probability);}
    if (data.type) {await this.safeFill(this.typeSelect, data.type);}
    if (data.leadSource) {await this.safeFill(this.leadSourceSelect, data.leadSource);}
  }

  /**
   * Save the opportunity form.
   */
  async save(): Promise<void> {
    await this.safeClick(this.saveButton);
    await this.waitForPageLoad();
  }

  /**
   * Cancel the opportunity form.
   */
  async cancel(): Promise<void> {
    await this.safeClick(this.cancelButton);
    await this.waitForPageLoad();
  }

  /**
   * Search for an opportunity by name.
   * @param name - Opportunity name to search for
   */
    async searchOpportunity(name: string): Promise<void> {
    await this.safeFill(this.searchInput, name);
    await this.searchInput.press('Enter');
    await this.waitForPageLoad();
    }

  /**
   * Check if an opportunity exists in the list by name.
   * @param name - Opportunity name
   */
  async opportunityExists(name: string): Promise<boolean> {
    const locator = this.page.locator(`text=${name}`).first();
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click on an opportunity name to open its detail page.
   * @param name - Opportunity name
   */
  async openOpportunity(name: string): Promise<void> {
    await this.page.locator(`text=${name}`).first().click();
    await this.waitForPageLoad();
  }

  /**
   * Update the opportunity stage.
   * @param name - Opportunity name
   * @param stage - New stage value
   */
  async updateStage(name: string, stage: string): Promise<void> {
    await this.openOpportunity(name);
    await this.safeFill(this.stageSelect, stage);
    await this.save();
  }

  /**
   * Get validation error message if present.
   */
  async getValidationError(): Promise<string | null> {
    try {
      await this.requiredFieldError.waitFor({ state: 'visible', timeout: 5000 });
      return await this.requiredFieldError.textContent();
    } catch {
      return null;
    }
  }
}
