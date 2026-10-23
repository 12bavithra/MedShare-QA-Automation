# MedShare QA Automation

## Project Overview
MedShare is a web application for sharing surplus medicines. This project focuses on testing its main features using Playwright and JavaScript.

**Live Application:** https://medshare-5u9n.onrender.com/

## Tools Used
- Playwright
- JavaScript
- Node.js
- Git and GitHub
- Jira for test task and issue tracking

## Testing Coverage
The automated tests cover:
- Application access and page navigation
- Medicine browsing and search
- Form validation
- Medicine content checks
- Additional functional scenarios

## Test Execution
In the recorded test run, **26 tests passed, 0 failed, and 0 were skipped**.

The tests can be run locally using:

```bash
npm install
npx playwright install
npx playwright test --reporter=list
```

To generate an HTML report:

```bash
npx playwright test --reporter=html
npx playwright show-report
```
## Jira – Test Management and Bug Tracking

Jira was used to track QA tasks and record issues found during MedShare testing.

- [KAN-4 – Prepare Test Cases for MedShare](https://12bavithra102004.atlassian.net/browse/KAN-4)
- [KAN-5 – Execute Manual Test Cases for MedShare](https://12bavithra102004.atlassian.net/browse/KAN-5)
- [KAN-6 – Record intermittent HTTP 503 error](https://12bavithra102004.atlassian.net/browse/KAN-6)

This demonstrates practice with test task tracking and defect reporting.

## Project Files
- `medshare.spec.cjs` and other `medshare-*.spec.cjs` files: Playwright test scripts
- `package.json`: Project dependencies and scripts
- `MedShare_QA_Test_Cases.xlsx`: Manual test cases and results
- `Playwright_Test_Report.html`: Recorded Playwright test report

## Notes
- Test results represent one recorded execution.
- Some application features may still require additional testing.
- This project was created for QA practice and portfolio demonstration.
