/**
 * Shared utility functions for the Salesforce QA Automation Framework.
 * Includes retry logic, random data generation, date helpers, and trace utilities.
 */

import type { Page } from '@playwright/test';

/**
 * Generate a random string of specified length.
 * @param length - Length of the string
 */
export function randomString(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random email address.
 */
export function randomEmail(): string {
  return `test${randomString(8)}@example.com`;
}

/**
 * Generate a random phone number.
 */
export function randomPhone(): string {
  return `+1-555-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

/**
 * Format a date as YYYY-MM-DD.
 * @param daysFromNow - Days offset from today
 */
export function futureDate(daysFromNow = 30): string {
  const date = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0];
}

/**
 * Retry an async function with exponential backoff.
 * @param fn - Function to retry
 * @param maxAttempts - Maximum number of attempts
 * @param baseDelay - Base delay in milliseconds
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 1000,
): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

/**
 * Wait for a condition to become true with polling.
 * @param condition - Condition function
 * @param timeout - Maximum wait time in ms
 * @param interval - Poll interval in ms
 */
export async function waitForCondition(
  condition: () => Promise<boolean>,
  timeout = 10000,
  interval = 500,
): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await condition()) {return true;}
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  return false;
}

/**
 * Capture a screenshot with a descriptive name.
 * @param page - Playwright Page
 * @param name - Screenshot name
 */
export async function captureScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({
    path: `screenshots/${name}-${Date.now()}.png`,
    fullPage: true,
  });
}

/**
 * Sanitize a string for use as a filename.
 * @param str - String to sanitize
 */
export function sanitizeFilename(str: string): string {
  return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

/**
 * Generate a unique test data object with timestamp.
 */
export function uniqueTestData(baseName: string): Record<string, string> {
  const suffix = Date.now().toString().slice(-6);
  return {
    name: `${baseName} ${suffix}`,
    suffix,
  };
}
