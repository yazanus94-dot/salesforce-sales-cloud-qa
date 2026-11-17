import type { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * SalesforceAPIClient - Reusable Salesforce REST API client
 * Handles authentication, case CRUD, SOQL queries, and response validation.
 * Never hardcodes credentials; uses environment variables only.
 */
export class SalesforceAPIClient {
  private readonly request: APIRequestContext;
  private accessToken: string | null = null;
  private instanceUrl: string | null = null;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Authenticate using Salesforce OAuth 2.0 username-password flow.
   * Credentials must be provided via environment variables.
   */
  async authenticate(): Promise<void> {
    const loginUrl = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
    const clientId = process.env.SF_CONNECTED_APP_CLIENT_ID;
    const clientSecret = process.env.SF_CONNECTED_APP_CLIENT_SECRET;
    const username = process.env.SF_USERNAME;
    const password = process.env.SF_PASSWORD;
    const securityToken = process.env.SF_SECURITY_TOKEN;

    if (!clientId || !clientSecret || !username || !password) {
      throw new Error(
        'SF_CONNECTED_APP_CLIENT_ID, SF_CONNECTED_APP_CLIENT_SECRET, SF_USERNAME, and SF_PASSWORD are required for API authentication',
      );
    }

    const response = await this.request.post(`${loginUrl}/services/oauth2/token`, {
      form: {
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username: username,
        password: password + (securityToken || ''),
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`Salesforce OAuth authentication failed: ${response.status()} ${body}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token as string;
    this.instanceUrl = data.instance_url as string;
  }

  /**
   * Get authenticated request headers.
   */
  private headers(): Record<string, string> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get the base instance URL for API calls.
   */
  private baseUrl(): string {
    if (!this.instanceUrl) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }
    return this.instanceUrl;
  }

  /**
   * Retrieve Case records via REST API.
   * @param soql - SOQL query string
   */
  async query(soql: string): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl()}/services/data/v60.0/query`, {
      params: { q: soql },
      headers: this.headers(),
    });
  }

  /**
   * Retrieve a single record by ID via REST API.
   * @param objectType - Salesforce object type (e.g., 'Case')
   * @param recordId - Salesforce record ID
   */
  async getRecord(objectType: string, recordId: string): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl()}/services/data/v60.0/sobjects/${objectType}/${recordId}`, {
      headers: this.headers(),
    });
  }

  /**
   * Create a Case record via REST API.
   * @param fields - Case field values
   */
  async createCase(fields: Record<string, unknown>): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl()}/services/data/v60.0/sobjects/Case`, {
      data: fields,
      headers: this.headers(),
    });
  }

  /**
   * Update a Case record via REST API.
   * @param recordId - Case record ID
   * @param fields - Fields to update
   */
  async updateCase(recordId: string, fields: Record<string, unknown>): Promise<APIResponse> {
    return await this.request.patch(`${this.baseUrl()}/services/data/v60.0/sobjects/Case/${recordId}`, {
      data: fields,
      headers: this.headers(),
    });
  }

  /**
   * Execute a SOQL query and return parsed records.
   * @param soql - SOQL query string
   */
  async runSOQL(soql: string): Promise<any> {
    const response = await this.query(soql);
    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`SOQL query failed: ${response.status()} ${body}`);
    }
    return await response.json();
  }

  /**
   * Verify authentication is active.
   */
  isAuthenticated(): boolean {
    return this.accessToken !== null && this.instanceUrl !== null;
  }
}
