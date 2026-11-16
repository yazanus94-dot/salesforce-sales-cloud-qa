# Architecture

## Overview

Salesforce Sales Cloud QA Automation Framework is a Playwright/TypeScript
automation framework that validates the complete Lead-to-Opportunity business
process in Salesforce Sales Cloud using the Page Object Model (POM) pattern.

## Architecture Diagram

```mermaid
flowchart TD
    Tests["tests/sales-cloud/\nLead, Conversion, Opportunity specs"]:::tests
    Fixtures["tests/fixtures/\nglobal-fixtures.ts"]:::fixtures
    Pages["src/pages/\nBase, Login, Lead, Account,\nContact, Opportunity"]:::pages
    Utils["src/utils/\ntest-utils.ts"]:::utils
    Factory["src/fixtures/\ntest-data.factory.ts,\nauth.fixture.ts"]:::factory
    Config["playwright.config.ts,\ntsconfig.json,\npackage.json"]:::config
    Env[".env.example\nCredentials & config"]:::env

    Tests --> Fixtures
    Tests --> Pages
    Fixtures --> Pages
    Pages --> Utils
    Pages --> Factory
    Pages --> Config
    Factory --> Config
    Config --> Env

    classDef tests fill:#e1f5fe,stroke:#01579b
    classDef fixtures fill:#f3e5f5,stroke:#4a148c
    classDef pages fill:#e8f5e9,stroke:#1b5e20
    classDef utils fill:#fff3e0,stroke:#e65100
    classDef factory fill:#fce4ec,stroke:#880e4f
    classDef config fill:#f1f8e9,stroke:#33691e
    classDef env fill:#f5f5f5,stroke:#424242
```

## Layer Overview

| Layer | Responsibility |
|-------|---------------|
| **Tests** | Test scenarios grouped by business process (Lead Mgmt, Lead Conversion, Opportunity Mgmt) |
| **Fixtures** | Auth fixtures, page object injection, test data factories |
| **Pages** | Page Object Model - encapsulates Salesforce Lightning UI interactions |
| **Utils** | Shared helpers - retry, random data, date formatting, screenshots |
| **Config** | Playwright config, TypeScript config, npm scripts |

## Test Execution Flow

1. **AuthFixture** logs into Salesforce using `SF_USERNAME`/`SF_PASSWORD` from `.env`
2. **Page Objects** navigate to the relevant tab (Leads, Accounts, Contacts, Opportunities)
3. **Test Data Factories** generate unique synthetic data to avoid duplicates
4. **Assertions** validate expected business outcomes
5. **Playwright** captures screenshots, traces, and videos on failure

## Security Boundaries

- Credentials are stored only in `.env` (never committed)
- `.env.example` provides template without real values
- No MFA bypass or authentication control circumvention
- No hardcoded secrets in source code
