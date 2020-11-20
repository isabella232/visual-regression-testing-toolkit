const showTestsStats = require("./showTestsStats");
const open = require("open");

const { HTML_FINAL_REPORT_INDEX_FILE_PATH } = require("../constants");

/**
 * Open the final HTML report in the default browser
 */
module.exports = async () => {
  showTestsStats();
  await open(HTML_FINAL_REPORT_INDEX_FILE_PATH);
};
