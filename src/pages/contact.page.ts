import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * ContactPage - Salesforce Contact Management Page Object
 * Handles contact creation, viewing, and linking to accounts.
 */
export class ContactPage extends BasePage {
  readonly newButton: Locator;
  readonly contactNameColumn: Locator;
  readonly searchInput: Locator;

  // Contact form fields
  readonly salutationSelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly accountInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly titleInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  // Validation
  readonly requiredFieldError: Locator;

  constructor(page: Page) {
    super(page);
    this.newButton = page.locator('button:has-text("New"), a:has-text("New")');
    this.contactNameColumn = page.locator('th[title="Contact Name"], span[title*="Contact Name"]');
    this.searchInput = page.locator('input[placeholder*="Search"], input[name="Contact Name"]');

    // Contact form fields
    this.salutationSelect = page.locator('select[name="salutation"], input[name="Salutation"]');
    this.firstNameInput = page.locator('input[name="firstName"], input[id*="FirstName"]');
    this.lastNameInput = page.locator('input[name="lastName"], input[id*="LastName"]');
    this.accountInput = page.locator('input[name="accountName"], input[id*="Account"]');
    this.emailInput = page.locator('input[name="email"], input[id*="Email"]');
    this.phoneInput = page.locator('input[name="phone"], input[id*="Phone"]');
    this.titleInput = page.locator('input[name="title"], input[id*="Title"]');

    // Actions
    this.saveButton = page.locator('button:has-text("Save"), input[value="Save"]');
    this.cancelButton = page.locator('button:has-text("Cancel"), input[value="Cancel"]');

    // Validation
    this.requiredFieldError = page.locator('div.error, span.error, [role="alert"]');
  }

  /**
   * Navigate to the Contacts tab.
   */
  async gotoContactsTab(): Promise<void> {
    await this.navigateToTab('Contacts');
    await this.waitForPageLoad();
  }

  /**
   * Click the New button to open the contact creation form.
   */
  async clickNew(): Promise<void> {
    await this.safeClick(this.newButton);
    await this.waitForPageLoad();
  }

  /**
   * Fill the contact creation form.
   * @param data - Contact field values
   */
  async fillContactForm(data: {
    salutation?: string;
    firstName: string;
    lastName: string;
    account?: string;
    email?: string;
    phone?: string;
    title?: string;
  }): Promise<void> {
    if (data.salutation) await this.safeFill(this.salutationSelect, data.salutation);
    await this.safeFill(this.firstNameInput, data.firstName);
    await this.safeFill(this.lastNameInput, data.lastName);
    if (data.account) await this.safeFill(this.accountInput, data.account);
    if (data.email) await this.safeFill(this.emailInput, data.email);
    if (data.phone) await this.safeFill(this.phoneInput, data.phone);
    if (data.title) await this.safeFill(this.titleInput, data.title);
  }

  /**
   * Save the contact form.
   */
  async save(): Promise<void> {
    await this.safeClick(this.saveButton);
    await this.waitForPageLoad();
  }

  /**
   * Cancel the contact form.
   */
  async cancel(): Promise<void> {
    await this.safeClick(this.cancelButton);
    await this.waitForPageLoad();
  }

  /**
   * Search for a contact by name.
   * @param name - Contact name to search for
   */
    async searchContact(name: string): Promise<void> {
    await this.safeFill(this.searchInput, name);
    await this.searchInput.press('Enter');
    await this.waitForPageLoad();
    }

  /**
   * Check if a contact exists in the list by name.
   * @param name - Contact name
   */
  async contactExists(name: string): Promise<boolean> {
    const locator = this.page.locator(`text=${name}`).first();
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click on a contact name to open its detail page.
   * @param name - Contact name
   */
  async openContact(name: string): Promise<void> {
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
