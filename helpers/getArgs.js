const args = require("yargs/yargs")(process.argv.slice(2)).argv;

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

  if (args.reference) {
    commandToRun = "reference";
  }

  if (args.test) {
    commandToRun = "test";
  }

  if (args.openReport) {
    commandToRun = "openReport";
  }

  if (args.showTestsStats) {
    commandToRun = "showTestsStats";
  }

  if (args.openFinalReport) {
    commandToRun = "openFinalReport";
  }

  if (args.reset) {
    commandToRun = "reset";
  }

  if (args.h) {
    commandToRun = "help";
  }

  return {
    csvFileName: args.csv,
    projectName: args.p,
    url: args.u,
    referenceUrl: args.r ? args.r : args.u,
    viewports: args.v,
    threshold: args.t,
    debug: !!args.d,
    force: !!args.force,
    commandToRun,
  };
};
