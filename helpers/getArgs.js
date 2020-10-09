const args = require("yargs").argv;
const { BACKSTOP_DEFAULT_VIEWPORT } = require("../constants");

/**
 * Get arguments
 *
 * @returns {{view: (string), project: (string|number|string), commandToRun: string, url: string}}
 */
module.exports = () => {
  let commandToRun = "";

  if (args.createProject) {
    commandToRun = "createProject";
  }

  if (args.deleteProject) {
    commandToRun = "deleteProject";
  }

  if (args.resetProject) {
    commandToRun = "resetProject";
  }

  if (args.reference) {
    commandToRun = "reference";
  }

  if (args.test) {
    commandToRun = "test";
  }

  if (args.approve) {
    commandToRun = "approve";
  }

  if (args.openReport) {
    commandToRun = "openReport";
  }

  return {
    project: args.p,
    url: args.u,
    view: args.v || BACKSTOP_DEFAULT_VIEWPORT,
    commandToRun,
  };
};
