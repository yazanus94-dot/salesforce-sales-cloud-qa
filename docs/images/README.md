# Test Images

This directory is reserved for test evidence and diagrams.

## Required Images (per GitHub Format.txt standard)

| Image | Purpose | Status |
|-------|---------|--------|
| `architecture.png` | System architecture diagram | ⏳ TBD - Mermaid diagram in docs/architecture.md |
| `test-results.png` | Playwright test results screenshot | ⏳ TBD - pending live execution |
| `coverage.png` | Test coverage report | ⏳ TBD - pending live execution |
| `workflow.png` | GitHub Actions CI workflow diagram | ⏳ TBD |

## How to Add Images

1. Run tests against a configured Salesforce org: `npm test`
2. Capture screenshots from `test-results/` or `playwright-report/`
3. Save PNG files with the exact filenames above
4. Reference them in `README.md` as `docs/images/<filename>`

## Current Status

No images committed yet. The architecture diagram is provided as a Mermaid diagram in `docs/architecture.md` (renders on GitHub). Test evidence screenshots are pending live Salesforce execution (requires credentials).
