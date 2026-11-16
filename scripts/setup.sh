#!/usr/bin/env bash
# Setup script for the Salesforce Sales Cloud QA Automation Framework.
# Installs dependencies and Playwright browsers.

set -euo pipefail

echo "[setup] Installing npm dependencies..."
npm install

echo "[setup] Installing Playwright browsers..."
npx playwright install chromium

echo "[setup] Done. Next steps:"
echo "  1. Copy .env.example to .env and add your Salesforce credentials"
echo "  2. Run: npm test"
echo "  3. Or run: npm run test:smoke"