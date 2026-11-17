import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * AccountPage - Salesforce Account Management Page Object
 * Handles account creation, viewing, and linking to leads/opportunities.
 */
export class AccountPage extends BasePage {
  readonly newButton: Locator;
  readonly accountNameColumn: Locator;
  readonly searchInput: Locator;

  // Account form fields
  readonly accountNameInput: Locator;
  readonly typeSelect: Locator;
  readonly industrySelect: Locator;
  readonly websiteInput: Locator;
  readonly phoneInput: Locator;
  readonly annualRevenueInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  // Validation
  readonly requiredFieldError: Locator;

  constructor(page: Page) {
    super(page);
    this.newButton = page.locator('button:has-text("New"), a:has-text("New")');
    this.accountNameColumn = page.locator('th[title="Account Name"], span[title*="Account Name"]');
    this.searchInput = page.locator('input[placeholder*="Search"], input[name="Account Name"]');

    // Account form fields
    this.accountNameInput = page.locator('input[name="name"], input[id*="AccountName"]');
    this.typeSelect = page.locator('select[name="type"], input[name="Type"]');
    this.industrySelect = page.locator('select[name="industry"], input[id*="Industry"]');
    this.websiteInput = page.locator('input[name="website"], input[id*="Website"]');
    this.phoneInput = page.locator('input[name="phone"], input[id*="Phone"]');
    this.annualRevenueInput = page.locator('input[name="annualRevenue"], input[id*="AnnualRevenue"]');

    // Actions
    this.saveButton = page.locator('button:has-text("Save"), input[value="Save"]');
    this.cancelButton = page.locator('button:has-text("Cancel"), input[value="Cancel"]');

    // Validation
    this.requiredFieldError = page.locator('div.error, span.error, [role="alert"]');
  }

  /**
   * Navigate to the Accounts tab.
   */
  async gotoAccountsTab(): Promise<void> {
    await this.navigateToTab('Accounts');
    await this.waitForPageLoad();
  }

  /**
   * Click the New button to open the account creation form.
   */
  async clickNew(): Promise<void> {
    await this.safeClick(this.newButton);
    await this.waitForPageLoad();
  }

  /**
   * Fill the account creation form.
   * @param data - Account field values
   */
  async fillAccountForm(data: {
    name: string;
    type?: string;
    industry?: string;
    website?: string;
    phone?: string;
    annualRevenue?: string;
  }): Promise<void> {
    await this.safeFill(this.accountNameInput, data.name);
    if (data.type) {await this.safeFill(this.typeSelect, data.type);}
    if (data.industry) {await this.safeFill(this.industrySelect, data.industry);}
    if (data.website) {await this.safeFill(this.websiteInput, data.website);}
    if (data.phone) {await this.safeFill(this.phoneInput, data.phone);}
    if (data.annualRevenue) {await this.safeFill(this.annualRevenueInput, data.annualRevenue);}
  }

  /**
   * Save the account form.
   */
  async save(): Promise<void> {
    await this.safeClick(this.saveButton);
    await this.waitForPageLoad();
  }

  /**
   * Cancel the account form.
   */
  async cancel(): Promise<void> {
    await this.safeClick(this.cancelButton);
    await this.waitForPageLoad();
  }

  /**
   * Search for an account by name.
   * @param name - Account name to search for
   */
    async searchAccount(name: string): Promise<void> {
    await this.safeFill(this.searchInput, name);
    await this.searchInput.press('Enter');
    await this.waitForPageLoad();
    }

  /**
   * Check if an account exists in the list by name.
   * @param name - Account name
   */
  async accountExists(name: string): Promise<boolean> {
    const locator = this.page.locator(`text=${name}`).first();
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click on an account name to open its detail page.
   * @param name - Account name
   */
  async openAccount(name: string): Promise<void> {
    await this.page.locator(`text=${name}`).first().click();
    await this.waitForPageLoad();
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
