const signale = require("signale");
const fs = require("fs-extra");
const {
  BACKSTOP_CONFIG_JSON_FILE_NAME,
  BACKSTOP_CONFIG_JSON_FILE_PATH,
} = require("../constants");
const backstop = require("backstopjs");

/**
 * Execute backstop commands
 *
 * @param {string} commandToRun - Command to run
 * @param {Object} projectConfig - Project config
 *
 * @returns {Promise<void>}
 */
module.exports = async (commandToRun, projectConfig) => {
  try {
    await fs.writeFile(
      BACKSTOP_CONFIG_JSON_FILE_PATH,
      JSON.stringify(projectConfig, null, 2),
      "utf8"
    );
    signale.success(
      `The ${BACKSTOP_CONFIG_JSON_FILE_PATH} file has been successfully generated/updated`
    );

    backstop(commandToRun, {
      docker: true,
      config: BACKSTOP_CONFIG_JSON_FILE_NAME,
    });
  } catch (error) {
    signale.fatal(error);
  }
};
