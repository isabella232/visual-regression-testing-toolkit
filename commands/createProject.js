const signale = require("signale");
const fs = require("fs-extra");
const { PROJECT_TEMPLATE_DIR } = require("../constants");

/**
 * Create a project
 *
 * @param {string} project - Project name
 * @param {string} projectPath - Project path
 *
 * @returns {Promise<void>}
 */
module.exports = (project, projectPath) => {
  if (!fs.existsSync(projectPath)) {
    try {
      fs.copySync(PROJECT_TEMPLATE_DIR, projectPath);
      signale.success(
        `The ${project} project has been created successfully at ${projectPath}`
      );
      process.exit(0);
    } catch (error) {
      signale.fatal(error);
      process.exit(1);
    }
  } else {
    signale.error(`The ${project} already exists at ${projectPath}`);
    process.exit(1);
  }
};
