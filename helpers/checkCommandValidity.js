const signale = require("signale");
const displayHelp = require("../helpers/displayHelp");

/**
 * Check command validity
 *
 * @param {string} command - Command
 */
module.exports = (command) => {
  if (
    ![
      "createProject",
      "deleteProject",
      "reference",
      "test",
      "openReport",
      "showTestsStats",
      "openFinalReport",
      "reset",
      "help",
    ].includes(command)
  ) {
    signale.error(`The command parameter is either invalid or missing`);
    displayHelp();
    process.exit(0);
  }
};
