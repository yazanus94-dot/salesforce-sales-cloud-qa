#!/usr/bin/env bash
# Run the full test suite for Salesforce Sales Cloud QA Automation Framework.
# Usage: ./scripts/run_tests.sh

set -euo pipefail

echo "[tests] Type check..."
npm run types

echo "[tests] Lint..."
npm run lint

echo "[tests] Format check..."
npm run format:check

echo "[tests] Running Playwright tests..."
npm test

echo "[tests] All checks passed."