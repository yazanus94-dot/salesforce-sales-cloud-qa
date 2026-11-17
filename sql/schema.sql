-- PostgreSQL Schema for Salesforce Test Data Warehouse
-- Project 2: Salesforce Service Cloud & API Automation Testing
-- Purpose: Store test case metadata, execution results, and traceability data

-- Test suite metadata
CREATE TABLE IF NOT EXISTS test_suites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    project VARCHAR(100) NOT NULL DEFAULT 'salesforce-service-cloud',
    test_type VARCHAR(50) NOT NULL CHECK (test_type IN ('ui', 'api', 'integration')),
    framework VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Individual test cases
CREATE TABLE IF NOT EXISTS test_cases (
    id SERIAL PRIMARY KEY,
    suite_id INTEGER REFERENCES test_suites(id) ON DELETE CASCADE,
    test_id VARCHAR(50) NOT NULL, -- e.g., SC-01, API-03, INT-01
    name VARCHAR(500) NOT NULL,
    description TEXT,
    tags TEXT[], -- e.g., {smoke, regression}
    priority VARCHAR(50) CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Test executions
CREATE TABLE IF NOT EXISTS test_executions (
    id SERIAL PRIMARY KEY,
    test_case_id INTEGER REFERENCES test_cases(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('passed', 'failed', 'skipped', 'blocked')),
    duration_ms INTEGER,
    error_message TEXT,
    screenshot_url TEXT,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    browser VARCHAR(100),
    environment VARCHAR(100)
);

-- Case traceability between UI and API
CREATE TABLE IF NOT EXISTS case_traceability (
    id SERIAL PRIMARY KEY,
    salesforce_case_id VARCHAR(18),
    case_number VARCHAR(50),
    created_via VARCHAR(50) CHECK (created_via IN ('ui', 'api', 'postman')),
    verified_via VARCHAR(50) CHECK (verified_via IN ('ui', 'api', 'soql')),
    consistency_check BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert test suite records
INSERT INTO test_suites (name, test_type, framework) VALUES
('Service Cloud Case Management', 'ui', 'Playwright'),
('Salesforce REST API', 'api', 'Playwright API Request'),
('UI/API Integration', 'integration', 'Playwright');

-- Insert test cases (Service Cloud UI - SC-01 to SC-12)
INSERT INTO test_cases (suite_id, test_id, name, description, tags, priority) VALUES
(1, 'SC-01', 'Create a new Case', 'Verify that a new Case can be created via the Service Cloud UI', '{smoke, regression}', 'critical'),
(1, 'SC-02', 'Validate mandatory fields', 'Verify that required field validation triggers on Case creation', '{smoke, regression}', 'high'),
(1, 'SC-03', 'Verify invalid Case submissions', 'Verify handling of invalid Case data submissions', '{regression}', 'medium'),
(1, 'SC-04', 'Update Case information', 'Verify that Case fields can be updated via the UI', '{regression}', 'high'),
(1, 'SC-05', 'Change Case priority', 'Verify that Case priority can be changed', '{regression}', 'medium'),
(1, 'SC-06', 'Assign Case to an agent or queue', 'Verify Case assignment functionality', '{regression}', 'medium'),
(1, 'SC-07', 'Change Case status', 'Verify that Case status transitions work', '{regression}', 'medium'),
(1, 'SC-08', 'Close a Case', 'Verify that a Case can be closed', '{regression}', 'high'),
(1, 'SC-09', 'Reopen a Case when supported', 'Verify Case reopen functionality where available', '{regression}', 'medium'),
(1, 'SC-10', 'Search and retrieve Cases', 'Verify Case search functionality', '{smoke, regression}', 'high'),
(1, 'SC-11', 'Verify data persistence after page refresh', 'Verify Case data persists after page refresh', '{regression}', 'medium'),
(1, 'SC-12', 'Test access restrictions and permissions', 'Verify Case access restrictions', '{regression}', 'medium');

-- Insert test cases (REST API - API-01 to API-09)
INSERT INTO test_cases (suite_id, test_id, name, description, tags, priority) VALUES
(2, 'API-01', 'Salesforce OAuth authentication', 'Verify OAuth 2.0 username-password authentication', '{regression}', 'critical'),
(2, 'API-02', 'Retrieve Case records via REST API', 'Verify Case retrieval via Salesforce REST API', '{regression}', 'high'),
(2, 'API-03', 'Create a Case via REST API', 'Verify Case creation via Salesforce REST API', '{regression}', 'high'),
(2, 'API-04', 'Update Case priority and status via API', 'Verify Case update via Salesforce REST API', '{regression}', 'high'),
(2, 'API-05', 'Retrieve records by ID via API', 'Verify single record retrieval by ID', '{regression}', 'medium'),
(2, 'API-06', 'Validate invalid requests', 'Verify handling of invalid API requests', '{regression}', 'medium'),
(2, 'API-07', 'Validate response codes and response data', 'Verify API response codes and data structure', '{regression}', 'high'),
(2, 'API-08', 'Verify data consistency between API and UI', 'Verify data consistency across API and UI', '{regression}', 'medium'),
(2, 'API-09', 'Retrieve Salesforce records through SOQL', 'Verify SOQL query execution via REST API', '{regression}', 'medium');

-- Insert test cases (Integration - INT-01 to INT-04)
INSERT INTO test_cases (suite_id, test_id, name, description, tags, priority) VALUES
(3, 'INT-01', 'Create Case via API, verify via SOQL, update via API, confirm in UI', 'End-to-end UI/API integration flow for Case management', '{smoke, regression}', 'critical'),
(3, 'INT-02', 'Create Case via UI, verify via API', 'Cross-verification: UI-created Case verified via API', '{regression}', 'high');

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_test_cases_test_id ON test_cases(test_id);
CREATE INDEX IF NOT EXISTS idx_test_executions_test_case_id ON test_executions(test_case_id);
CREATE INDEX IF NOT EXISTS idx_test_executions_executed_at ON test_executions(executed_at);
CREATE INDEX IF NOT EXISTS idx_case_traceability_salesforce_case_id ON case_traceability(salesforce_case_id);

-- Sample query: Get all failed test executions
-- SELECT tc.test_id, tc.name, te.status, te.error_message, te.executed_at
-- FROM test_executions te
-- JOIN test_cases tc ON te.test_case_id = tc.id
-- WHERE te.status = 'failed'
-- ORDER BY te.executed_at DESC;

-- Sample query: Get pass rate by suite
-- SELECT ts.name,
--        COUNT(te.id) AS total,
--        SUM(CASE WHEN te.status = 'passed' THEN 1 ELSE 0 END) AS passed,
--        ROUND(100.0 * SUM(CASE WHEN te.status = 'passed' THEN 1 ELSE 0 END) / COUNT(te.id), 2) AS pass_rate_percent
-- FROM test_executions te
-- JOIN test_cases tc ON te.test_case_id = tc.id
-- JOIN test_suites ts ON tc.suite_id = ts.id
-- GROUP BY ts.name;
