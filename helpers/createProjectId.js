const Url = require("url-parse");

/**
 * Create project ID
 *
 * @param {string} url - Project url
 * @param {string} projectName - Project name
 *
 @returns {string}
 */
module.exports = (url, projectName = "") => {
  if (projectName) {
    return projectName;
  }

  const parseUrl = Url(url);
  return (
    parseUrl.hostname.replace(/\./g, "_") +
    parseUrl.pathname.replace(/\//g, "_").replace(/_\s*$/, "")
  );
};
