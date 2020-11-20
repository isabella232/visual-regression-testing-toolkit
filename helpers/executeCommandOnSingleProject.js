const fs = require("fs-extra");
const executeBackstopCommand = require("./executeBackstopCommand");
const createProject = require("../commands/createProject");
const deleteProject = require("../commands/deleteProject");
const checkRequiredParameter = require("../helpers/checkRequiredParameter");
const { PROJECT_ROOT } = require("../constants");
const createProjectId = require("../helpers/createProjectId");

/**
 * Execute command on single project
 *
 * @param {string} commandToRun - Command to run
 * @param {Object} settings - Project settings
 *
 * @returns {Promise<void>}
 */
module.exports = async (commandToRun, settings) => {
  const {
    projectName,
    url,
    referenceUrl,
    viewports,
    threshold,
    debug,
    force,
    csvMode = false,
  } = settings;

  checkRequiredParameter("url", "u", url);

  const project = createProjectId(url, projectName);
  const projectPath = `${PROJECT_ROOT}/${project}`;

  if (commandToRun === "deleteProject") {
    await deleteProject(project, projectPath, force);

    if (csvMode) {
      return;
    }

    process.exit(0);
  }

  if (commandToRun === "createProject") {
    createProject(project, projectPath);

    if (csvMode) {
      return;
    }

    process.exit(0);
  }

  if (!fs.existsSync(projectPath)) {
    createProject(project, projectPath);
  }

  const referenceDirPath = `${projectPath}/tests/${viewports}/bitmaps_reference`;

  if (commandToRun === "test" && !fs.existsSync(referenceDirPath)) {
    await executeBackstopCommand("reference", {
      project,
      projectPath,
      url,
      referenceUrl,
      viewports,
      threshold,
      debug,
    });
  }

  await executeBackstopCommand(commandToRun, {
    project,
    projectPath,
    url,
    referenceUrl,
    viewports,
    threshold,
    debug,
  });
};
