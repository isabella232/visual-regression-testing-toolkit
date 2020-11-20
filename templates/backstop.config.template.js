module.exports = (options) => {
  return {
    id: options.project,
    viewports: options.viewports,
    onBeforeScript: "puppet/onBefore.js",
    onReadyScript: "puppet/onReady.js",
    scenarios: options.scenarios,
    paths: {
      bitmaps_reference: `projects/${options.project}/tests/${options.label}/bitmaps_reference`,
      bitmaps_test: `projects/${options.project}/tests/${options.label}/bitmaps_test`,
      engine_scripts: `projects/${options.project}/setup_files/engine_scripts`,
      html_report: `projects/${options.project}/tests/${options.label}/html_report`,
      json_report: `projects/${options.project}/tests/${options.label}/json_report`,
    },
    report: ["json"],
    engine: "puppeteer",
    engineOptions: {
      args: ["--no-sandbox"],
    },
    asyncCaptureLimit: 5,
    asyncCompareLimit: 10,
    debug: options.debug,
    debugWindow: false,
  };
};
