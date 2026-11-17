import { test as base } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { LeadPage } from '../../src/pages/lead.page';
import { AccountPage } from '../../src/pages/account.page';
import { ContactPage } from '../../src/pages/contact.page';
import { OpportunityPage } from '../../src/pages/opportunity.page';
import { CasePage } from '../../src/pages/case.page';
import { AuthFixture } from '../../src/fixtures/auth.fixture';

// Extend base test with custom fixtures
export const test = base.extend<{
  loginPage: LoginPage;
  leadPage: LeadPage;
  accountPage: AccountPage;
  contactPage: ContactPage;
  opportunityPage: OpportunityPage;
  casePage: CasePage;
  auth: AuthFixture;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  leadPage: async ({ page }, use) => {
    await use(new LeadPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  opportunityPage: async ({ page }, use) => {
    await use(new OpportunityPage(page));
  },
  casePage: async ({ page }, use) => {
    await use(new CasePage(page));
  },
  auth: async ({ page }, use) => {
    await use(new AuthFixture(page));
  },
});

// Auto-login before each test that needs authentication
export const authenticatedTest = test.extend<{
  loginPage: LoginPage;
  leadPage: LeadPage;
  accountPage: AccountPage;
  contactPage: ContactPage;
  opportunityPage: OpportunityPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    // Only login if credentials are available
    if (process.env.SF_USERNAME && process.env.SF_PASSWORD) {
      await loginPage.goto();
      await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
      if (process.env.SF_SECURITY_TOKEN) {
        await loginPage.handleTwoFactor(process.env.SF_SECURITY_TOKEN);
      }
    }
    await use(loginPage);
  },
  leadPage: async ({ page }, use) => {
    await use(new LeadPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  opportunityPage: async ({ page }, use) => {
    await use(new OpportunityPage(page));
  },
});

export { expect } from '@playwright/test';
