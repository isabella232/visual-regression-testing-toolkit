const { PROJECT_ROOT, BACKSTOP_CORE_CONFIG_JS_FILE_PATH } = require("../constants");
const checkFileExists = require("./checkFileExists");

/**
 * Get project config
 *
 * @param {string} project - Project name
 * @param {string} url - Project url
 * @param {string} view - View to select the viewport
 */
module.exports = (project, url, view) => {
  const projectConstantsPath = `${PROJECT_ROOT}/${project}/constants.js`;
  checkFileExists(projectConstantsPath);
  const projectConstants = require(projectConstantsPath);

  const projectDataPath = `${PROJECT_ROOT}/${project}/scenarios.js`;
  checkFileExists(projectDataPath);
  const projectData = require(projectDataPath)({
    baseUrl: url,
    DEFAULT_DELAY: projectConstants.DEFAULT_DELAY,
    viewport: view,
    projectConstants: projectConstants,
  });

  return require(BACKSTOP_CORE_CONFIG_JS_FILE_PATH)({
    project: project,
    viewport: projectConstants.VIEWPORTS[view],
    scenarios: projectData.scenarios.map((scenario) => {
      return Object.assign({}, projectConstants.SCENARIO_DEFAULTS, scenario);
    }),
  });
};
