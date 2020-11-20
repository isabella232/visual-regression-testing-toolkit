const fs = require("fs-extra");
const signale = require("signale");
const glob = require("glob");

const {
  JSON_FINAL_REPORT_FILE_PATH,
  HTML_FINAL_REPORT_CONFIG_FILE_PATH,
} = require("../constants");

/**
 * Create final report
 */
module.exports = () => {
  const projectsJsonReports = glob.sync(
    "projects/**/bitmaps_test/**/report.json"
  );

  if (projectsJsonReports.length === 0) {
    signale.error(
      "There are no tests yet. Create some tests first before a report can be created"
    );
    process.exit(0);
  }

  const finalReport = {
    testSuite: "BackstopJS",
    tests: [],
    stats: [],
    id: "Aggregated tests report",
  };

  projectsJsonReports.map((jsonReportFilePath) => {
    const fileContent = fs.readFileSync(jsonReportFilePath, {
      encoding: "utf8",
    });

    const n = jsonReportFilePath.indexOf("bitmaps_test");
    const testRootRelativePath = "../../" + jsonReportFilePath.slice(0, n);

    const stats = fs.statSync(jsonReportFilePath);
    const report = JSON.parse(fileContent);

    for (const test of report.tests) {
      // Create the report stats
      const reportStat = {
        time: stats.mtime, // Modified timestamp of the report file
        url: test.pair.url,
        referenceUrl: test.pair.referenceUrl,
        viewport: test.pair.viewportLabel,
        status: test.status,
      };

      finalReport.stats.push(reportStat);

      // Update file paths for the test
      test.pair.reference = test.pair.reference.replace(
        "../",
        testRootRelativePath
      );
      test.pair.test = test.pair.test.replace("../", testRootRelativePath);

      if (test.pair.diffImage !== undefined) {
        test.pair.diffImage = test.pair.diffImage.replace(
          "../",
          testRootRelativePath
        );
      }

      // Add a timestamp to the test
      test.pair.test.time = stats.mtime; // Modified timestamp of the report file

      finalReport.tests.push(test);
    }
  });

  fs.writeFileSync(
    JSON_FINAL_REPORT_FILE_PATH,
    JSON.stringify(finalReport, null, 2),
    {
      encoding: "utf8",
    }
  );

  fs.writeFileSync(
    HTML_FINAL_REPORT_CONFIG_FILE_PATH,
    "report(" + JSON.stringify(finalReport, null, 2) + ");",
    {
      encoding: "utf8",
    }
  );
};
