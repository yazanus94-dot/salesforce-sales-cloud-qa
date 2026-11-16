import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * LoginPage - Salesforce Lightning Login Page Object
 * Handles authentication to Salesforce Login, Sandbox, or custom domain.
 */
export class LoginPage extends BasePage {
  // Login form selectors
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // Two-factor authentication selectors
  readonly totpInput: Locator;
  readonly verifyButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username, input[name="username"]');
    this.passwordInput = page.locator('#password, input[name="password"]');
    this.loginButton = page.locator('#Login, input[type="submit"], button[type="submit"]');
    this.errorMessage = page.locator('#error, .loginError, div.error');
    this.totpInput = page.locator('input[name="verificationCode"], input[id*="verification"]');
    this.verifyButton = page.locator('button:has-text("Verify"), input[type="submit"]');
  }

  /**
   * Navigate to the Salesforce login page.
   */
  async goto(): Promise<void> {
    const baseUrl = process.env.SF_BASE_URL || 'https://login.salesforce.com';
    await this.page.goto(baseUrl);
    await this.waitForPageLoad();
  }

  /**
   * Log in to Salesforce with username and password.
   * @param username - Salesforce username
   * @param password - Salesforce password
   */
  async login(username: string, password: string): Promise<void> {
    await this.safeFill(this.usernameInput, username);
    await this.safeFill(this.passwordInput, password);
    await this.safeClick(this.loginButton);
    await this.waitForPageLoad();
  }

  /**
   * Handle two-factor authentication (TOTP) if prompted.
   * @param token - TOTP verification code
   */
  async handleTwoFactor(token: string): Promise<void> {
    try {
      await this.totpInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.safeFill(this.totpInput, token);
      await this.safeClick(this.verifyButton);
      await this.waitForPageLoad();
    } catch {
      // TOTP not required - continue
    }
  }

  /**
   * Check if login error is displayed.
   */
  async hasLoginError(): Promise<boolean> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get login error message text.
   */
  async getLoginError(): Promise<string | null> {
    if (await this.hasLoginError()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }
}
