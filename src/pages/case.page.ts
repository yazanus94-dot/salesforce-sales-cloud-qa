import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * CasePage - Salesforce Service Cloud Case Management Page Object
 * Handles case creation, editing, priority/status changes, assignment, and closure.
 */
export class CasePage extends BasePage {
  // Case list view selectors
  readonly newButton: Locator;
  readonly caseNumberColumn: Locator;
  readonly searchInput: Locator;

  // Case form selectors (Create/Edit)
  readonly subjectInput: Locator;
  readonly descriptionInput: Locator;
  readonly originSelect: Locator;
  readonly prioritySelect: Locator;
  readonly statusSelect: Locator;
  readonly reasonSelect: Locator;
    readonly typeSelect: Locator;
    readonly accountInput: Locator;
    readonly contactInput: Locator;
    readonly assignedToInput: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;

    // Case detail selectors
    readonly caseNumberDisplay: Locator;
    readonly statusDisplay: Locator;
    readonly priorityDisplay: Locator;
    readonly closeCaseButton: Locator;
    readonly reopenCaseButton: Locator;

    // Validation
    readonly requiredFieldError: Locator;

    constructor(page: Page) {
        super(page);
        this.newButton = page.locator('button:has-text("New"), a:has-text("New")');
        this.caseNumberColumn = page.locator('th[title="Case Number"], span[title*="Case Number"]');
        this.searchInput = page.locator('input[placeholder*="Search"], input[name="Case Number"]');

        // Case form fields
        this.subjectInput = page.locator('input[name="subject"], input[id*="Subject"]');
        this.descriptionInput = page.locator('textarea[name="description"], textarea[id*="Description"]');
        this.originSelect = page.locator('select[name="origin"], input[name="Origin"]');
        this.prioritySelect = page.locator('select[name="priority"], input[name="Priority"]');
        this.statusSelect = page.locator('select[name="status"], input[name="Status"]');
        this.reasonSelect = page.locator('select[name="reason"], input[name="Reason"]');
        this.typeSelect = page.locator('select[name="type"], input[name="Type"]');
        this.accountInput = page.locator('input[name="accountName"], input[id*="Account"]');
        this.contactInput = page.locator('input[name="contactName"], input[id*="Contact"]');
        this.assignedToInput = page.locator('input[name="assignedTo"], input[id*="Owner"]');

        // Actions
        this.saveButton = page.locator('button:has-text("Save"), input[value="Save"]');
        this.cancelButton = page.locator('button:has-text("Cancel"), input[value="Cancel"]');

        // Case detail actions
        this.closeCaseButton = page.locator('button:has-text("Close Case"), a:has-text("Close Case")');
        this.reopenCaseButton = page.locator('button:has-text("Reopen"), a:has-text("Reopen")');

        // Case detail displays
        this.caseNumberDisplay = page.locator('span[title*="Case Number"], div[class*="case-number"]');
        this.statusDisplay = page.locator('span[title*="Status"], div[class*="status-value"]');
        this.priorityDisplay = page.locator('span[title*="Priority"], div[class*="priority-value"]');

        // Validation
        this.requiredFieldError = page.locator('div.error, span.error, [role="alert"]');
    }

    /**
     * Navigate to the Service Cloud Cases tab.
     */
    async gotoCasesTab(): Promise<void> {
        await this.navigateToTab('Cases');
        await this.waitForPageLoad();
    }

    /**
     * Click the New button to open the case creation form.
     */
    async clickNew(): Promise<void> {
        await this.safeClick(this.newButton);
        await this.waitForPageLoad();
    }

    /**
     * Fill the case creation form.
     * @param data - Case field values
     */
    async fillCaseForm(data: {
        subject: string;
        description?: string;
        origin?: string;
        priority?: string;
        status?: string;
        reason?: string;
        type?: string;
        account?: string;
        contact?: string;
        assignedTo?: string;
    }): Promise<void> {
        await this.safeFill(this.subjectInput, data.subject);
        if (data.description) {await this.safeFill(this.descriptionInput, data.description);}
        if (data.origin) {await this.safeFill(this.originSelect, data.origin);}
        if (data.priority) {await this.safeFill(this.prioritySelect, data.priority);}
        if (data.status) {await this.safeFill(this.statusSelect, data.status);}
        if (data.reason) {await this.safeFill(this.reasonSelect, data.reason);}
        if (data.type) {await this.safeFill(this.typeSelect, data.type);}
        if (data.account) {await this.safeFill(this.accountInput, data.account);}
        if (data.contact) {await this.safeFill(this.contactInput, data.contact);}
        if (data.assignedTo) {await this.safeFill(this.assignedToInput, data.assignedTo);}
    }

    /**
     * Save the case form.
     */
    async save(): Promise<void> {
        await this.safeClick(this.saveButton);
        await this.waitForPageLoad();
    }

    /**
     * Cancel the case form.
     */
    async cancel(): Promise<void> {
        await this.safeClick(this.cancelButton);
        await this.waitForPageLoad();
    }

    /**
     * Search for a case by number or subject.
     * @param query - Search query
     */
    async searchCase(query: string): Promise<void> {
        await this.safeFill(this.searchInput, query);
        await this.searchInput.press('Enter');
        await this.waitForPageLoad();
    }

    /**
     * Check if a case exists in the list by number or subject.
     * @param identifier - Case number or subject
     */
    async caseExists(identifier: string): Promise<boolean> {
        const locator = this.page.locator(`text=${identifier}`).first();
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Click on a case number to open its detail page.
     * @param caseNumber - Case number
     */
    async openCase(caseNumber: string): Promise<void> {
        await this.page.locator(`text=${caseNumber}`).first().click();
        await this.waitForPageLoad();
    }

    /**
     * Update the case priority.
     * @param caseNumber - Case number
     * @param priority - New priority value
     */
    async updatePriority(caseNumber: string, priority: string): Promise<void> {
        await this.openCase(caseNumber);
        await this.safeFill(this.prioritySelect, priority);
        await this.save();
    }

    /**
     * Update the case status.
     * @param caseNumber - Case number
     * @param status - New status value
     */
    async updateStatus(caseNumber: string, status: string): Promise<void> {
        await this.openCase(caseNumber);
        await this.safeFill(this.statusSelect, status);
        await this.save();
    }

    /**
     * Assign the case to an agent or queue.
     * @param caseNumber - Case number
     * @param assignee - Agent name or queue name
     */
    async assignCase(caseNumber: string, assignee: string): Promise<void> {
        await this.openCase(caseNumber);
        await this.safeFill(this.assignedToInput, assignee);
        await this.save();
    }

    /**
     * Close the case.
     */
    async closeCase(): Promise<void> {
        await this.safeClick(this.closeCaseButton);
        await this.waitForPageLoad();
    }

    /**
     * Reopen the case.
     */
    async reopenCase(): Promise<void> {
        await this.safeClick(this.reopenCaseButton);
        await this.waitForPageLoad();
    }

    /**
     * Get case number from detail page.
     */
    async getCaseNumber(): Promise<string | null> {
        try {
            await this.caseNumberDisplay.waitFor({ state: 'visible', timeout: 5000 });
            return await this.caseNumberDisplay.textContent();
        } catch {
            return null;
        }
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
