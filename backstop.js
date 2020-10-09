const { PROJECT_ROOT } = require("./constants");
const deleteProject = require("./commands/deleteProject");
const createProject = require("./commands/createProject");
const getArgs = require("./helpers/getArgs");
const checkRequiredParameter = require("./helpers/checkRequiredParameter");
const checkProjectExists = require("./helpers/checkProjectExists");
const getProjectConfig = require("./helpers/getProjectConfig");
const executeBackstopCommands = require("./helpers/executeBackstopCommands");

const { project, url, view, commandToRun } = getArgs();

(async () => {
  checkRequiredParameter("project", "p", project);

  const projectPath = `${PROJECT_ROOT}/${project}`;

  if (commandToRun === "deleteProject") {
    await deleteProject(project, projectPath);
  }

  checkRequiredParameter("url", "u", url);

  if (commandToRun === "createProject") {
    createProject(project, projectPath);
  }

  checkProjectExists(commandToRun, project, projectPath);
  const projectConfig = getProjectConfig(project, url, view);

  process.argv = []; // This is to avoid passing (y)args to the Backstop Client

  await executeBackstopCommands(commandToRun, projectConfig);
})();
