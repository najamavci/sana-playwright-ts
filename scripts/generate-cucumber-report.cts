import path from "node:path";
import fs from "node:fs";

// cucumber-html-reporter is CommonJS and may not ship TypeScript types.
// This import style works reliably in TS when running via ts-node in a CJS project.
import reporter = require("cucumber-html-reporter");

const jsonFile = path.resolve("playwright/.artifacts/cucumber-report.json");
const reportDir = path.resolve("playwright/.artifacts/cucumber-html");

fs.mkdirSync(reportDir, { recursive: true });

reporter.generate({
    theme: "bootstrap",
    jsonFile,
    output: path.join(reportDir, "index.html"),
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
        "Test Framework": "CucumberJS",
        Automation: "Playwright",
        Node: process.version,
    },
});