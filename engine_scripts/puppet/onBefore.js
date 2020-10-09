// eslint-disable-next-line no-unused-vars
module.exports = async (page, scenario, vp) => {
  await require("./loadCookies")(page, scenario);
};
