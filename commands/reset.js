const signale = require("signale");
const fs = require("fs-extra");
const prompts = require("prompts");

const {
  PROJECT_ROOT,
  HTML_FINAL_REPORT_CONFIG_FILE_PATH,
  JSON_FINAL_REPORT_FILE_PATH,
} = require("../constants");

/**
 * Reset. It will delete all projects and the final report
 *
 * @param {boolean} force - Whether or not to force the deletion
 *
 * @returns {Promise<void>}
 */
module.exports = async (force) => {
  let response = {
    value: false,
  };

  if (!force) {
    response = await prompts({
      type: "confirm",
      name: "value",
      message: `Are you sure you want to reset, it will delete all projects and final report`,
      initial: true,
    });
  }

  if (force || response.value) {
    fs.emptyDirSync(PROJECT_ROOT);
    fs.removeSync(HTML_FINAL_REPORT_CONFIG_FILE_PATH);
    fs.removeSync(JSON_FINAL_REPORT_FILE_PATH);

    signale.success(
      `All projects in ${PROJECT_ROOT} have been deleted as well as the final report`
    );
  }
};
