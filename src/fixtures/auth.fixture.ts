import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

/**
 * AuthFixture provides reusable authentication fixtures for tests.
 * Handles login flow and session management across test scenarios.
 */
export class AuthFixture {
  private readonly page: Page;
  private loginPage: LoginPage | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Get the login page instance (lazy initialization).
   */
  private getLoginPage(): LoginPage {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page);
    }
    return this.loginPage;
  }

  /**
   * Log in to Salesforce using environment credentials.
   * Skips if already logged in (detected by presence of App Launcher).
   */
  async login(): Promise<void> {
    const loginPage = this.getLoginPage();
    await loginPage.goto();

    const username = process.env.SF_USERNAME;
    const password = process.env.SF_PASSWORD;
    const token = process.env.SF_SECURITY_TOKEN;

    if (!username || !password) {
      throw new Error(
        'SF_USERNAME and SF_PASSWORD environment variables are required for Salesforce authentication'
      );
    }

    await loginPage.login(username, password);

    // Handle two-factor authentication if security token is provided
    if (token) {
      await loginPage.handleTwoFactor(token);
    }
  }

  /**
   * Check if user is already logged in by looking for App Launcher.
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      const appLauncher = this.page.locator(
        'button[title="App Launcher"], div.slds-radar-header div.slds-button'
      );
      await appLauncher.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
