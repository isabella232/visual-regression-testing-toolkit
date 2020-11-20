const {
  PROJECT_ROOT,
  BACKSTOP_CORE_CONFIG_JS_FILE_PATH,
} = require("../constants");
const checkFileExists = require("./checkFileExists");
const transformViewports = require("./transformViewports");

/**
 * Get project config
 *
 * @param {string} project - Project name
 * @param {string} url - Project url
 * @param {string} referenceUrl - Project reference url to take a screenshot
 * @param {string} viewports - Viewports
 * @param {number} threshold - Screenshots comparison threshold value
 * @param {boolean} debug - Debug flag
 */
module.exports = ({
  project,
  url,
  referenceUrl,
  viewports,
  threshold,
  debug = false,
}) => {
  const projectConstantsPath = `${PROJECT_ROOT}/${project}/setup_files/constants.js`;
  checkFileExists(projectConstantsPath);
  const projectConstants = require(projectConstantsPath);

  const scenariosPath = `${PROJECT_ROOT}/${project}/setup_files/scenarios.js`;
  checkFileExists(scenariosPath);
  const label = viewports
    ? viewports.replace(",", "-")
    : projectConstants.DEFAULT_LABEL;

  const projectData = require(scenariosPath)({
    label,
    baseUrl: url,
    referenceUrl: referenceUrl,
    DEFAULT_DELAY: projectConstants.DEFAULT_DELAY,
    projectConstants: projectConstants,
  });

  const scenario_defaults = projectConstants.SCENARIO_DEFAULTS;

  if (threshold) {
    scenario_defaults.misMatchThreshold = Number(threshold);
  }

  return require(BACKSTOP_CORE_CONFIG_JS_FILE_PATH)({
    debug: debug,
    project: project,
    label,
    viewports: viewports
      ? transformViewports(viewports)
      : projectConstants.VIEWPORTS,
    scenarios: projectData.scenarios.map((scenario) => {
      return Object.assign({}, scenario_defaults, scenario);
    }),
  });
};
