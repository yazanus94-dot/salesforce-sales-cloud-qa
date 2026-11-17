import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * LeadPage - Salesforce Lead Management Page Object
 * Handles lead creation, editing, searching, and validation.
 */
export class LeadPage extends BasePage {
  // Lead list view selectors
  readonly newButton: Locator;
  readonly leadNameColumn: Locator;
  readonly searchInput: Locator;

  // Lead form selectors (Create/Edit)
  readonly salutationSelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly statusSelect: Locator;
    readonly sourceSelect: Locator;
    readonly ratingSelect: Locator;
    readonly industrySelect: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;

    // Validation message selectors
    readonly requiredFieldError: Locator;
    readonly duplicateLeadError: Locator;

    constructor(page: Page) {
        super(page);
        this.newButton = page.locator('button:has-text("New"), a:has-text("New")');
        this.leadNameColumn = page.locator('th[title="Lead Name"], span[title*="Lead Name"]');
        this.searchInput = page.locator('input[placeholder*="Search"], input[name="Lead Name"]');

        // Lead form fields
        this.salutationSelect = page.locator('select[name="salutation"], input[name="salutation"]');
        this.firstNameInput = page.locator('input[name="firstName"], input[id*="FirstName"]');
        this.lastNameInput = page.locator('input[name="lastName"], input[id*="LastName"]');
        this.companyInput = page.locator('input[name="company"], input[id*="Company"]');
        this.emailInput = page.locator('input[name="email"], input[id*="Email"]');
        this.phoneInput = page.locator('input[name="phone"], input[id*="Phone"]');
        this.statusSelect = page.locator('select[name="status"], input[name="Status"]');
        this.sourceSelect = page.locator('select[name="source"], input[name="LeadSource"]');
        this.ratingSelect = page.locator('select[name="rating"], input[name="Rating"]');
        this.industrySelect = page.locator('select[name="industry"], input[id*="Industry"]');

        // Actions
        this.saveButton = page.locator('button:has-text("Save"), input[value="Save"]');
        this.cancelButton = page.locator('button:has-text("Cancel"), input[value="Cancel"]');

        // Validation
        this.requiredFieldError = page.locator('div.error, span.error, [role="alert"]');
        this.duplicateLeadError = page.locator('text=Duplicate, text=duplicate');
    }

    /**
     * Navigate to the Leads tab.
     */
    async gotoLeadsTab(): Promise<void> {
        await this.navigateToTab('Leads');
        await this.waitForPageLoad();
    }

    /**
     * Click the New button to open the lead creation form.
     */
    async clickNew(): Promise<void> {
        await this.safeClick(this.newButton);
        await this.waitForPageLoad();
    }

    /**
     * Fill the lead creation form with provided data.
     * @param data - Lead field values
     */
    async fillLeadForm(data: {
        salutation?: string;
        firstName: string;
        lastName: string;
        company: string;
        email?: string;
        phone?: string;
        status?: string;
        source?: string;
        rating?: string;
        industry?: string;
    }): Promise<void> {
        if (data.salutation) {await this.safeFill(this.salutationSelect, data.salutation);}
        await this.safeFill(this.firstNameInput, data.firstName);
        await this.safeFill(this.lastNameInput, data.lastName);
        await this.safeFill(this.companyInput, data.company);
        if (data.email) {await this.safeFill(this.emailInput, data.email);}
        if (data.phone) {await this.safeFill(this.phoneInput, data.phone);}
        if (data.status) {await this.safeFill(this.statusSelect, data.status);}
        if (data.source) {await this.safeFill(this.sourceSelect, data.source);}
        if (data.rating) {await this.safeFill(this.ratingSelect, data.rating);}
        if (data.industry) {await this.safeFill(this.industrySelect, data.industry);}
    }

    /**
     * Save the lead form.
     */
    async save(): Promise<void> {
        await this.safeClick(this.saveButton);
        await this.waitForPageLoad();
    }

    /**
     * Cancel the lead form.
     */
    async cancel(): Promise<void> {
        await this.safeClick(this.cancelButton);
        await this.waitForPageLoad();
    }

    /**
     * Search for a lead by name.
     * @param name - Lead name to search for
     */
    async searchLead(name: string): Promise<void> {
        await this.safeFill(this.searchInput, name);
        await this.searchInput.press('Enter');
        await this.waitForPageLoad();
    }

    /**
     * Check if a lead exists in the list by name.
     * @param name - Lead name
     */
    async leadExists(name: string): Promise<boolean> {
        const locator = this.page.locator(`text=${name}`).first();
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Click on a lead name to open its detail page.
     * @param name - Lead name
     */
    async openLead(name: string): Promise<void> {
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
