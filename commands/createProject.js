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
  try {
    fs.copySync(PROJECT_TEMPLATE_DIR, `${projectPath}/setup_files`);
    signale.success(
      `The ${project} project has been created successfully at ${projectPath}`
    );
  } catch (error) {
    signale.fatal(error);
    process.exit(1);
  }
};
