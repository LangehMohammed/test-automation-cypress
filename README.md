# 🧪 Cypress Test Automation

A web test automation project built with **Cypress** to practice and demonstrate automated testing of web applications using the SauceDemo demo application.

This project focuses on developing practical test automation skills, validating application behavior, and building a foundation for reliable, repeatable software testing.

## 🚀 Project Overview

The repository contains a Cypress end-to-end (E2E) testing setup configured to run against [SauceDemo](https://www.saucedemo.com/).

The goal is to explore browser automation, write repeatable tests, and understand how automated testing can help identify regressions and improve software quality.

## 🛠️ Tech Stack

- **Cypress** — End-to-end test automation
- **JavaScript** — Test configuration and automation code
- **Node.js & npm** — Dependency management and test execution
- **SauceDemo** — Web application under test

## 📂 Project Structure

```text
cypress/
├── cypress/             # Cypress tests and supporting files
├── cypress.config.js    # Cypress configuration
├── package.json         # Project dependencies
├── package-lock.json    # Dependency lockfile
├── .gitignore           # Git exclusion rules
└── README.md            # Project documentation
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/LangehMohammed/test-automation-cypress.git
```

### 2. Navigate to the project directory

```bash
cd test-automation-cypress
```

### 3. Install dependencies

```bash
npm install
```

### 4. Launch Cypress

Open the interactive Cypress Test Runner:

```bash
npx cypress open
```

Select the E2E testing option, choose a supported browser, and run the desired test spec.

### 5. Run tests in headless mode

To execute the test suite from the terminal:

```bash
npx cypress run
```

This is useful for repeatable test execution and provides a foundation for running automated tests in a continuous integration environment.

## 🎯 Learning Objectives

This project provides hands-on practice with:

- Browser-based end-to-end test automation
- Cypress configuration and test execution
- Automated validation of web application behavior
- Writing repeatable tests to support regression testing
- Using Node.js and npm to manage a test automation project

## 🔮 Potential Improvements

Future enhancements could include:

- Expanding coverage of critical user journeys
- Adding reusable custom Cypress commands
- Improving test data management and test isolation
- Capturing screenshots and videos for debugging failures
- Integrating automated test execution with GitHub Actions
- Generating test reports for easier analysis

## 👨‍💻 Author

**Langeh Mohammed**

Software Developer | Backend Development | Test Automation

- GitHub: [@LangehMohammed](https://github.com/LangehMohammed)
- Project Repository: [test-automation-cypress](https://github.com/LangehMohammed/test-automation-cypress)

---

*This project is part of my continued learning journey in software quality assurance and automated testing.*
