# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/) and the
project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-11-16

### Added
- Playwright/TypeScript QA automation framework for Salesforce Sales Cloud
- Page Object Model: BasePage, LoginPage, LeadPage, AccountPage, ContactPage, OpportunityPage
- Test data factories: leadData, accountData, contactData, opportunityData
- AuthFixture for Salesforce authentication with TOTP support
- 16 test scenarios across Lead Management, Lead Conversion, Opportunity Management
- Smoke (@smoke) and Regression (@regression) test tagging
- playwright.config.ts with Chromium, Firefox, WebKit projects
- .env.example for secure credential management
- Dockerfile and docker-compose.yml for reproducible CI/CD
- GitHub Actions CI workflow
- docs/: architecture, design-decisions, debugging-log, security, test-plan, requirements-traceability-matrix
- scripts/: setup.sh, run_tests.sh
- README.md, LICENSE, CONTRIBUTING.md, CHANGELOG.md

### Test Coverage
- Total requirements: 16
- Implemented test cases: 16 (100%)
- Smoke tests: 4 (TC-01, TC-02, TC-08, TC-12)
- Regression tests: 16 (TC-01 through TC-16)

### Limitations
- Live Salesforce execution requires credentials (SF_USERNAME, SF_PASSWORD, SF_SECURITY_TOKEN)
- Test evidence screenshots pending live execution
- Convert button availability depends on Salesforce org configuration
