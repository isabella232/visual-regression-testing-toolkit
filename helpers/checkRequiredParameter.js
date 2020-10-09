const signale = require("signale");

/**
 * Check required parameter
 *
 * @param {string} parameterName - Parameter name
 * @param {string} parameterShortname - Parameter short name
 * @param {string} parameter - Parameter value
 */
module.exports = (parameterName, parameterShortname, parameter) => {
  if (!parameter) {
    signale.error(
      `The ${parameterName} parameter is required. Usage: -${parameterShortname} value`
    );
    process.exit(1);
  }
};
