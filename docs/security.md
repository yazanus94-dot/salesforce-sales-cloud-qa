# Security Considerations

## Threat Model

The Salesforce QA Automation Framework interacts with Salesforce CRM containing customer, lead, account, contact, and opportunity data. The framework must never expose credentials or bypass security controls.

## Security Boundaries

### 1. Credential Management
- **Never commit credentials:** `.env` is in `.gitignore`; only `.env.example` is tracked
- **No hardcoded secrets:** No passwords, tokens, or security tokens in source code
- **Environment variables only:** `SF_USERNAME`, `SF_PASSWORD`, `SF_SECURITY_TOKEN` loaded from `.env` at runtime
- **CI/CD secrets:** GitHub Actions uses repository secrets, never plaintext in workflow files

### 2. Authentication Controls
- **No MFA bypass:** Two-factor authentication is handled via the official TOTP flow using `SF_SECURITY_TOKEN`
- **No session theft:** Authentication state, cookies, and tokens are never exported or logged
- **No credential sharing:** Each CI run uses its own credentials from repository secrets

### 3. Data Handling
- **Synthetic test data only:** All lead, account, contact, and opportunity data is randomly generated
- **No real customer data:** The framework never processes or stores real customer information
- **Test data cleanup:** Unique suffixes prevent data pollution; test records can be identified and removed

### 4. Execution Restrictions
- **Headless mode in CI:** Browser runs headless in CI/CD to prevent unintended interactions
- **No bypass of validation:** Tests verify Salesforce validation rules rather than bypassing them
- **No insecure HTTP:** All Salesforce connections use HTTPS

## Known Limitations

- `.env.example` contains placeholder values that must be replaced before live execution
- Salesforce session timeout may interrupt long test suites
- MFA enforcement varies by org configuration; TOTP handling requires `SF_SECURITY_TOKEN`

## Reporting Security Issues

Open a GitHub issue or contact the repository owner. Do not disclose credentials or security vulnerabilities in public issues; use private disclosure when appropriate.
