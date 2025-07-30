

# Boon's Playwright Framework

This repository contains a Playwright framework that provide a robust, scalable, and feature-rich solution for automated testing of the Snipe-IT application.

## Usage

- Clone the repository and install dependencies using `npm install`
- You can run test using `npx playwright test`
- After running test you can view report by using `npx playwright show-report`
- Framework supports running test in different environments (e.g. env.test.json and env.dev.json). These execute by running following:
    - BASH:         `TEST_ENV=test npx playwright test`
    - CMD:          `set TEST_ENV=test && npx playwright test`
    - POWERSHELL:   `$env:TEST_ENV="test"; npx playwright test`
- Please explore the source code files for my detailed implementation of this framework.

## Features

- Use of `Page Object Model` (POM) including `Page Object Chaining` design pattern for code readbility, maintenance and reusablity
- Use of `test.describe.configure({ retries: 1 });` as automatic retry mechanism 
- Use of utility file in `utils\testUtils.ts `
- `dotEnv` used to store sensitive username, password information (although i removed .env from gitignore so it is uploaded to repo for you to see I have implemented it!)
- Ability to run scripts in different environments by using `utils\env.ts` and environment config files e.g `config\env.test.json`
- FOR FUTURE IMPLEMENTATION: Other features that have could be added given more time: allure reporter, eslint/playwright eslint plugin, global error logger, external file logging, fixtures, cucumber etc 

## Project Snipe-IT Folder Structure

The framework is structured as follows:

Project Folder<br>
├── node_modules <br>
├── playwright-report <br>
└── src<br>
&nbsp; &nbsp; &nbsp; &nbsp;├── config<br>
&nbsp; &nbsp; &nbsp; &nbsp;├── logging<br>
&nbsp; &nbsp; &nbsp; &nbsp;├── pages<br>
&nbsp; &nbsp; &nbsp; &nbsp;└── tests<br>
&nbsp; &nbsp; &nbsp; &nbsp;└── utils<br>
├── test-results <br>
│ .env<br>
│ .gitignore<br>
│ package-lock.json<br>
│ package.json<br>
│ playwright.config.ts<br>
│ readme.md<br>

## Description

- `.env`: Stores environment variables without hardcording senstive data
- `.gitignore`: Specifies intentionally untracked files to ignore in Git.
- `package-lock.json` and `package.json`: Node.js package files specifying project dependencies.
- `playwright.config.ts`: Configuration file for Playwright settings.
- `readme.md`: This file!

### `node_modules`

- Directory containing Node.js modules installed by npm.

### `playwright-report`

- Directory for storing Playwright test reports.

### `src`

- Source code directory containing project files.

#### `config`

- Directory containing environment configuration files e.g. `env.test.json`.

#### `pages`

- Page object files representing different pages of the application under test.

#### `tests`

- Directory for test scripts written in TypeScript.

#### `utils`

- Directory for utility scripts used in testing, such as encryption and logging utilities.

### `test-results`

- Directory for storing test execution results, including screenshots, trace files, and videos.

## License

Free for anyone!
