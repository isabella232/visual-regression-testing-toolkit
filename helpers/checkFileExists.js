const signale = require("signale");
const fs = require("fs-extra");

/**
 * Check file exits
 *
 * @param {string} filePath - File path
 */
module.exports = (filePath) => {
  if (!fs.existsSync(filePath)) {
    signale.error(`The ${filePath} file is missing. Make sure it exists`);
    process.exit(1);
  }
};
