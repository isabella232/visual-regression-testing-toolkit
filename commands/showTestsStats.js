const fs = require("fs-extra");
const { Table } = require("console-table-printer");
const createFinalReport = require("../helpers/createFinalReport");
const { JSON_FINAL_REPORT_FILE_PATH } = require("../constants");

/**
 * Show final report stats in the console
 */
module.exports = () => {
  if (!fs.existsSync(JSON_FINAL_REPORT_FILE_PATH)) {
    createFinalReport();
  }

  const fileContent = fs.readFileSync(JSON_FINAL_REPORT_FILE_PATH, {
    encoding: "utf8",
  });
  const report = JSON.parse(fileContent);

  const cliTable = new Table();
  for (const stat of report.stats) {
    const rowColor = stat.status === "pass" ? "green" : "red";
    cliTable.addRow(stat, { color: rowColor });
  }

  cliTable.printTable();
};
