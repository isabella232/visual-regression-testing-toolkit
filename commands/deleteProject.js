const signale = require("signale");
const fs = require("fs-extra");
const prompts = require("prompts");

/**
 * Delete a project
 *
 * @param {string} project - Project name
 * @param {string} projectPath - Project path
 * @param {boolean} force - Whether or not to force the deletion
 *
 * @returns {Promise<void>}
 */
module.exports = async (project, projectPath, force) => {
  if (!fs.existsSync(projectPath)) {
    signale.error(`The ${project} cannot be deleted because it does not exits`);
    process.exit(0);
  }

  let response = {
    value: false,
  };

  if (!force) {
    response = await prompts({
      type: "confirm",
      name: "value",
      message: `Are you sure you want to delete the ${project} project (it will delete all related files)`,
      initial: true,
    });
  }

  if (force || response.value) {
    fs.removeSync(projectPath);
    signale.success(
      `The ${project} project located ${projectPath} has been successfully deleted`
    );
  }
};
