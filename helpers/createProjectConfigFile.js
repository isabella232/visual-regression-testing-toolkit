const signale = require("signale");
const fs = require("fs-extra");
const { BACKSTOP_CONFIG_JSON_FILE_NAME } = require("../constants");

/**
 * Create project backstop config file
 *
 * @param {string} projectPath - Project path
 * @param {string} viewports - Viewports
 * @param {object} projectConfig - Project configuration
 *
 * @returns {string}
 */
module.exports = (projectPath, viewports, projectConfig) => {
  const projectConfigFileDirPath = `${projectPath}/tests/${viewports.replace(
    ",",
    "-"
  )}`;

  fs.ensureDirSync(projectConfigFileDirPath);

  const backstop_config_json_file_path = `${projectConfigFileDirPath}/${BACKSTOP_CONFIG_JSON_FILE_NAME}`;
  fs.writeFileSync(
    backstop_config_json_file_path,
    JSON.stringify(projectConfig, null, 2),
    "utf8"
  );
  signale.success(
    `The ${backstop_config_json_file_path} file has been successfully generated/updated`
  );

  return backstop_config_json_file_path;
};
