# Contributing to Salesforce-Sales-Cloud-QA

Thank you for considering a contribution to this project! This is a Salesforce Sales Cloud QA Automation Framework built with Playwright and TypeScript.

## How to Contribute

### 1. Fork and Clone

```bash
git clone https://github.com/yazanus94-dot/salesforce-sales-cloud-qa.git
cd salesforce-sales-cloud-qa
```

### 2. Set Up the Development Environment

```bash
npm install
npx playwright install chromium
cp .env.example .env
# Edit .env with your Salesforce credentials
```

### 3. Run the Checks

```bash
# Lint
npm run lint

# Type check
npm run types

# Format check
npm run format:check

# Run tests
npm test
```

### 4. Submit a Pull Request

- Create a feature branch from `develop`: `git checkout -b feature/<type>-<description> develop`
- Make your changes
- Add or update tests as needed
- Ensure all existing tests pass
- Open a pull request against `develop` with a clear description
- PRs are squash-merged into `develop`; releases are merged into `main`

See [docs/git-workflow.md](docs/git-workflow.md) for the full branching, commit, PR, and review workflow.

## Code Style

- TypeScript with strict mode
- ESLint + Prettier for formatting
- Page Object Model pattern
- Meaningful test names with `@smoke`/`@regression` tags
- No hardcoded credentials or secrets

## Security

- Never commit `.env` with real credentials
- Use `.env.example` as a template
- Report security issues privately

## License

MIT Licensed. See [LICENSE](LICENSE).