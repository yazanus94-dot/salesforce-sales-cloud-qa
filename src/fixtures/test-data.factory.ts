/**
 * Test data factories for Salesforce Sales Cloud QA Automation Framework.
 * Generates unique, valid test data for Leads, Accounts, Contacts, and Opportunities.
 * All data is synthetic and suitable for test execution against a Salesforce org.
 */

/**
 * Generate a unique suffix to avoid duplicate data conflicts.
 */
export function uniqueSuffix(): string {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Lead test data factory.
 * @param overrides - Field values to override defaults
 */
export function leadData(
  overrides: Record<string, string> = {},
): {
  salutation: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  rating: string;
  industry: string;
} {
  const suffix = uniqueSuffix();
  return {
    salutation: overrides.salutation || 'Mr.',
    firstName: overrides.firstName || `Test${suffix}`,
    lastName: overrides.lastName || `Lead${suffix}`,
    company: overrides.company || `Test Company ${suffix}`,
    email: overrides.email || `test${suffix}@example.com`,
    phone: overrides.phone || `+1-555-${Math.floor(Math.random() * 9000 + 1000)}`,
    status: overrides.status || 'Open - Not Contacted',
    source: overrides.source || 'Web',
    rating: overrides.rating || 'Hot',
    industry: overrides.industry || 'Technology',
    ...overrides,
  } as {
    salutation: string;
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
    status: string;
    source: string;
    rating: string;
    industry: string;
  };
}

/**
 * Account test data factory.
 * @param overrides - Field values to override defaults
 */
export function accountData(
  overrides: Record<string, string> = {},
): {
  name: string;
  type: string;
  industry: string;
  website: string;
  phone: string;
  annualRevenue: string;
} {
  const suffix = uniqueSuffix();
  return {
    name: overrides.name || `Test Account ${suffix}`,
    type: overrides.type || 'Prospect',
    industry: overrides.industry || 'Technology',
    website: overrides.website || `https://www.test${suffix}.com`,
    phone: overrides.phone || `+1-555-${Math.floor(Math.random() * 9000 + 1000)}`,
    annualRevenue: overrides.annualRevenue || '1000000',
    ...overrides,
  } as {
    name: string;
    type: string;
    industry: string;
    website: string;
    phone: string;
    annualRevenue: string;
  };
}

/**
 * Contact test data factory.
 * @param overrides - Field values to override defaults
 */
export function contactData(
  overrides: Record<string, string> = {},
): {
  salutation: string;
  firstName: string;
  lastName: string;
  account: string;
  email: string;
  phone: string;
  title: string;
} {
  const suffix = uniqueSuffix();
  return {
    salutation: overrides.salutation || 'Ms.',
    firstName: overrides.firstName || `Contact${suffix}`,
    lastName: overrides.lastName || `Test${suffix}`,
    account: overrides.account || '',
    email: overrides.email || `contact${suffix}@example.com`,
    phone: overrides.phone || `+1-555-${Math.floor(Math.random() * 9000 + 1000)}`,
    title: overrides.title || 'QA Engineer',
    ...overrides,
  } as {
    salutation: string;
    firstName: string;
    lastName: string;
    account: string;
    email: string;
    phone: string;
    title: string;
  };
}

/**
 * Opportunity test data factory.
 * @param overrides - Field values to override defaults
 */
export function opportunityData(
  overrides: Record<string, string> = {},
): {
  name: string;
  account: string;
  closeDate: string;
  stage: string;
  amount: string;
  probability: string;
  type: string;
  leadSource: string;
} {
  const suffix = uniqueSuffix();
  const futureDate = new Date(
    Date.now() + 90 * 24 * 60 * 60 * 1000,
  )
    .toISOString()
    .split('T')[0];
  return {
    name: overrides.name || `Test Opportunity ${suffix}`,
    account: overrides.account || '',
    closeDate: overrides.closeDate || futureDate,
    stage: overrides.stage || 'Prospecting',
    amount: overrides.amount || '50000',
    probability: overrides.probability || '10',
    type: overrides.type || 'New Business',
    leadSource: overrides.leadSource || 'Web',
    ...overrides,
  } as {
    name: string;
    account: string;
    closeDate: string;
    stage: string;
    amount: string;
    probability: string;
    type: string;
    leadSource: string;
  };
}

/**
 * Case test data factory.
 * @param overrides - Field values to override defaults
 */
export function caseData(
  overrides: Record<string, string> = {},
): {
  subject: string;
  description: string;
  origin: string;
  priority: string;
  status: string;
  reason: string;
  type: string;
  account: string;
  contact: string;
  assignedTo: string;
} {
  const suffix = uniqueSuffix();
  return {
    subject: overrides.subject || `Support Case ${suffix}`,
    description: overrides.description || `Test case description ${suffix}`,
    origin: overrides.origin || 'Phone',
    priority: overrides.priority || 'Medium',
    status: overrides.status || 'New',
    reason: overrides.reason || 'Installation Issue',
    type: overrides.type || 'Customer Support',
    account: overrides.account || '',
    contact: overrides.contact || '',
    assignedTo: overrides.assignedTo || '',
    ...overrides,
  } as {
    subject: string;
    description: string;
    origin: string;
    priority: string;
    status: string;
    reason: string;
    type: string;
    account: string;
    contact: string;
    assignedTo: string;
  };
}

/**
 * Invalid lead data for negative testing (missing required fields).
 */
export function invalidLeadData(): {
  salutation: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  rating: string;
  industry: string;
} {
  return {
    salutation: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    status: '',
    source: '',
    rating: '',
    industry: '',
  };
}

/**
 * Invalid opportunity data for negative testing.
 */
export function invalidOpportunityData(): {
  name: string;
  account: string;
  closeDate: string;
  stage: string;
  amount: string;
  probability: string;
  type: string;
  leadSource: string;
} {
  return {
    name: '',
    account: '',
    closeDate: '',
    stage: '',
    amount: '',
    probability: '',
    type: '',
    leadSource: '',
  };
}
