exports.SCENARIO_DEFAULTS = {
  misMatchThreshold: 0.015,
};

exports.DEFAULT_DELAY = 200;

exports.VIEWPORTS = {
  default: {
    label: "default",
    width: 1920,
    height: 1080,
  },
  desktop: {
    label: "desktop",
    width: 1920,
    height: 1080,
  },
  phone: {
    label: "phone",
    width: 375,
    height: 667,
  },
  tablet: {
    label: "tablet",
    width: 768,
    height: 1024,
  },
};

//exports.COOKIES = {
//  // add more cookies here
//  subscribed: {
//    name: "authorisation",
//    value: "subscribed",
//  },
//};

exports.DEFAULT_HIDDEN_SELECTORS = [".rmaHeader", ".rmaFooter"];
