import type { Page, Locator } from '@playwright/test';

/**
 * BasePage provides shared utilities for all Page Object Model classes.
 * Handles common Salesforce Lightning navigation patterns, waiting, and element interaction.
 */
export class BasePage {
  public readonly page: Page;

  // Common Salesforce Lightning selectors
  protected readonly appLauncher: Locator;
  protected readonly searchBar: Locator;
  protected readonly setupMenu: Locator;
  protected readonly userMenu: Locator;
  protected readonly toastMessage: Locator;
  protected readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appLauncher = page.locator('button[title="App Launcher"], div.slds-radar-header div.slds-button');
    this.searchBar = page.locator('input[placeholder*="Search"], input.slds-input[aria-label*="Search"]');
    this.setupMenu = page.locator('button[title="Setup"], a[title="Setup"]');
    this.userMenu = page.locator('button[title*="User Menu"], div.slds-global-header__user-profile');
    this.toastMessage = page.locator('div[role="alert"], div.forceActionsToast, div.lightning-primitive-toast');
    this.loadingSpinner = page.locator('div.slds-spinner, div.loading-container');
  }

  /**
   * Wait for a page to fully load by ensuring spinners are gone.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for loading spinner to disappear if present
    try {
      await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 });
    } catch {
      // Spinner may not be present - that's fine
    }
  }

  /**
   * Wait for a toast notification and return its text.
   */
  async getToastMessage(timeout = 10000): Promise<string | null> {
    try {
      await this.toastMessage.waitFor({ state: 'visible', timeout });
      return await this.toastMessage.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Click the App Launcher to navigate between apps.
   */
  async openAppLauncher(): Promise<void> {
    await this.appLauncher.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Navigate to a specific tab/object via App Launcher.
   */
  async navigateToTab(tabName: string): Promise<void> {
    await this.openAppLauncher();
    const searchInput = this.page.locator('input[placeholder*="Search items and apps"]');
    await searchInput.fill(tabName);
    await this.page.waitForTimeout(500);
    const tab = this.page.locator(`text=${tabName}`).first();
    await tab.click();
    await this.waitForPageLoad();
  }

  /**
   * Take a named screenshot for failure evidence.
   */
  async captureScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Wait for a selector to be visible and return it.
   */
  async waitForVisible(locator: Locator, timeout = 10000): Promise<Locator> {
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  /**
   * Safe click that waits for visibility first.
   */
  async safeClick(locator: Locator): Promise<void> {
    await this.waitForVisible(locator);
    await locator.click();
  }

  /**
   * Safe fill that waits for visibility first.
   */
  async safeFill(locator: Locator, value: string): Promise<void> {
    await this.waitForVisible(locator);
    await locator.fill(value);
  }
}
