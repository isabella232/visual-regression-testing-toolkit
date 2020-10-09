const signale = require("signale");
const fs = require("fs-extra");
const prompts = require("prompts");

/**
 * Delete a project
 *
 * @param {string} project - Project name
 * @param {string} projectPath - Project path
 *
 * @returns {Promise<void>}
 */
module.exports = async (project, projectPath) => {
  if (!fs.existsSync(projectPath)) {
    signale.error(`The ${project} cannot be deleted because it does not exits`);
    process.exit(1);
  }

  const response = await prompts({
    type: "confirm",
    name: "value",
    message: `Are you sure you want to delete the ${project} project (it will delete all related files)`,
    initial: true,
  });

  if (response.value) {
    fs.removeSync(projectPath);
    signale.success(
      `The ${project} project located ${projectPath} has been successfully deleted`
    );
  }

  process.exit(0);
};
