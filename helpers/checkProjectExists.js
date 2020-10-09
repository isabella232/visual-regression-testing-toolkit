const signale = require("signale");
const fs = require("fs-extra");

/**
 * Check project exits
 *
 * @param {string} commandToRun - Command to run
 * @param {string} project - Project name
 * @param {string} projectPath - Project path
 */
module.exports = (commandToRun, project, projectPath) => {
  if (commandToRun !== "createProject" && !fs.existsSync(projectPath)) {
    signale.error(
      `The ${project} needs to be created first using the createProject command`
    );
    process.exit(1);
  }
};
