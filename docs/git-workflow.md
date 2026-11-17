# Git & Collaboration Workflow — Salesforce Sales Cloud QA Automation Framework

Professional branching, pull request, issue, and review workflow for developers, QA engineers, and reviewers.

## 1. Branching Strategy

The repository uses a **main + develop** model with feature branches.

| Branch | Purpose | Protected | Who can push |
|--------|---------|-----------|--------------|
| `main` | Production-ready, deployable state. Only receives merged feature branches via PR. | Yes | Maintainers (via PR merge) |
| `develop` | Integration branch for the next release. All feature branches target `develop` first. | Yes | Maintainers (via PR merge) |
| `feature/<type>-<short-description>` | New feature, test, or improvement. Branched from `develop`, merged to `develop`. | No | Contributors |
| `bugfix/<id>-<short-description>` | Patch for a defect. Branched from `develop` (or `main` for hotfix). | No | Contributors |
| `release/<version>` | Release stabilization. Branched from `develop`, merged to `main` and `develop`. | No | Maintainers |
| `hotfix/<id>-<short-description>` | Urgent production fix. Branched from `main`, merged to `main` and `develop`. | No | Maintainers |

### Branch naming conventions

```
feature/qa-lead-validation          # new test or feature
feature/api-case-crud               # new API test coverage
bugfix/TC-08-convert-button         # defect fix tied to a test case
release/v1.1.0                      # release candidate
hotfix/P0-auth-failure              # urgent production fix
```

### Rules

1. **Never commit directly to `main`.** All changes to `main` must come through an approved pull request.
2. **Feature branches target `develop` first.** `develop` is merged to `main` only at release time.
3. **Delete feature branches after merge** to keep the repository clean.
4. **Keep branches short-lived** (ideally < 5 days). Rebase frequently onto `develop`.
5. **One logical change per branch.** Do not bundle unrelated fixes.

## 2. Commit Message Guidelines

Use conventional commits. Every commit must be meaningful and describe *what* changed and *why*.

### Format

```
<type>(<scope>): <short summary>

<optional body: motivation and context>

Closes: <issue key or TestCaseID>
```

### Types

| Type | Use |
|------|-----|
| `feat` | New test case, page object, fixture, or utility |
| `fix` | Bug fix in test code or framework |
| `docs` | Documentation only (README, docs, templates) |
| `test` | Adding or updating tests without production change |
| `refactor` | Code restructure with no behavior change |
| `ci` | CI/CD workflow or config changes |
| `chore` | Maintenance, dependencies, lint config |

### Scope examples

| Scope | Meaning |
|-------|---------|
| `qa:lead-management` | Sales Cloud Lead Management tests |
| `qa:case-management` | Service Cloud Case Management tests |
| `qa:api` | Salesforce REST API tests |
| `qa:integration` | UI/API integration tests |
| `qa:fixtures` | Test data / auth fixtures |
| `qa:pages` | Page Object Model |
| `ci` | GitHub Actions workflows |

### Examples

```
feat(qa:lead-management): add TC-05 lead status update test

Adds test case TC-05 (RM-05) for updating a Lead's status and verifying
persistence. Uses unique synthetic data to avoid duplicate conflicts.

Closes: RM-05
```

```
fix(qa:case-management): handle missing Convert button in TC-08

Wrap Convert action in existence check so the test passes gracefully when
the org configuration hides the Convert button.

Closes: TC-08
```

```
ci: add scheduled nightly regression workflow

Adds a nightly `schedule` trigger that runs the full `@regression` suite
and preserves artifacts for 30 days.
```

## 3. Pull Request Process

### Creating a PR

1. Push your feature branch to the remote.
2. Open a pull request from `feature/...` → `develop`.
3. Use the pull request template (`.github/templates/pull_request_template.md`).
4. Link the related issue(s) and test case(s) in the PR description.
5. Request at least one reviewer (QA lead or maintainer).

### PR checklist (must be complete before merge)

- [ ] Branch targets `develop` (not `main`)
- [ ] Commit messages follow conventional commit format
- [ ] `npm run types` passes locally
- [ ] `npm run lint` passes locally
- [ ] `npm run format:check` passes locally
- [ ] New tests are added for new behavior
- [ ] Existing tests still pass
- [ ] No hardcoded credentials or secrets
- [ ] `.env` is not committed (only `.env.example`)
- [ ] Documentation updated (if behavior changed)
- [ ] Linked issue(s) referenced

### Merging

- Use **squash and merge** to keep `develop` history clean.
- The PR author must not self-approve.
- A PR requires **at least one approval** and all required status checks green before merge.
- After merge, delete the feature branch.

## 4. Issue Templates

Use the appropriate issue template when creating an issue:

- **Bug Report** — a test failure or framework defect (`.github/templates/bug_report.md`)
- **Feature Request** — new test coverage, page object, or utility (`.github/templates/feature_request.md`)
- **Test Case** — a new requirement/test case to automate (`.github/templates/test_case.md`)

Never report security vulnerabilities in public issues. See `docs/security.md` for private disclosure.

## 5. Code Review Checklist

### For the author

- [ ] Self-reviewed the diff before requesting review
- [ ] Tests pass locally (`npm test`, `npm run types`, `npm run lint`)
- [ ] Commit history is clean and meaningful
- [ ] No secrets or credentials in code
- [ ] Linked to issue/test case

### For the reviewer

- [ ] Change matches the issue/test case scope
- [ ] Page Object Model used consistently (selectors in page classes, not tests)
- [ ] Unique synthetic data used (no hardcoded lead/account values)
- [ ] No hardcoded waits (`page.waitForTimeout`) where avoidable
- [ ] Tests tagged appropriately (`@smoke` / `@regression`)
- [ ] No credentials committed; `.env` gitignored
- [ ] Lint and type check pass
- [ ] Documentation updated if behavior changed

## 6. Test Review Checklist

- [ ] Test name references a TestCaseID (e.g., `TC-08`, `SC-01`, `API-03`)
- [ ] Test tagged with `@smoke` (critical path) or `@regression` (comprehensive)
- [ ] Uses `auth.login()` / `authenticatedTest` fixture where authentication needed
- [ ] Uses test data factory (`leadData`, `caseData`, etc.) — no hardcoded data
- [ ] Assertions verify business outcome, not just page navigation
- [ ] Negative/invalid cases included where applicable
- [ ] Flaky-test risk assessed (no `waitForTimeout` without justification)
- [ ] Screenshot/trace captured on failure (via Playwright config `retain-on-failure`)

## 7. README Contribution Instructions

1. Fork the repository.
2. Create a feature branch from `develop`: `git checkout -b feature/<type>-<description> develop`
3. Install dependencies: `npm install` and `npx playwright install chromium`.
4. Copy `.env.example` to `.env` and add your Salesforce credentials (never commit `.env`).
5. Make changes, add tests, and run `npm run types`, `npm run lint`, `npm test`.
6. Commit with conventional commit messages.
7. Push and open a pull request against `develop`.
8. Address review feedback; once approved, the PR will be squash-merged.

## 8. Security & Reliability

- Credentials live only in repository secrets (CI) or `.env` (local) — never in code.
- Never run destructive automation against production.
- External-system tests are conditional on valid environment configuration.
- Tests that cannot run because credentials are unavailable must be clearly identified, not skipped silently.
