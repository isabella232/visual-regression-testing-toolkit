const backstop = require("backstopjs");
const signale = require("signale");
const getProjectConfig = require("./getProjectConfig");
const createProjectConfigFile = require("./createProjectConfigFile");
const { REPO_ROOT } = require("../constants");

/**
 * Execute backstop commands
 *
 * @param {string} commandToRun - Command to run
 * @param {Object} settings - Project settings
 *
 * @returns {Promise<void>}
 */
module.exports = async (commandToRun, settings) => {
  const {
    project,
    projectPath,
    url,
    referenceUrl,
    viewports,
    threshold,
    debug,
  } = settings;

  const projectConfig = getProjectConfig({
    project,
    url,
    referenceUrl,
    viewports,
    threshold,
    debug,
  });

  const projectConfigFile = createProjectConfigFile(
    projectPath,
    viewports,
    projectConfig
  );

  process.argv = []; // This is to avoid passing (y)args to the Backstop Client

  try {
    await backstop(commandToRun, {
      docker: true,
      config: projectConfigFile.replace(`${REPO_ROOT}/`, ""),
    })
      .then(() => {
        // console.log("Worked");
      })
      .catch(() => {
        // console.log("Failed");
      });
  } catch (error) {
    signale.fatal(error);
  }
};
