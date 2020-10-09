module.exports = (options) => {
  const scenarios = require(`./${options.viewport}Scenarios`)(options)
    .scenarios;

  return {
    scenarios,
  };
};
