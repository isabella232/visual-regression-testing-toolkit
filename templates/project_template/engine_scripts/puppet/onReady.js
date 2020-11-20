// eslint-disable-next-line no-unused-vars
module.exports = async (page, scenario, vp) => {
  console.log("SCENARIO > " + scenario.label);
  await require("./clickAndHoverHelper")(page, scenario);

  // add more ready handlers here...
};
