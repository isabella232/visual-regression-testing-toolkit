const fs = require("fs-extra");
const csv = require("csvtojson");

const {
  DEFAULT_VIEWPORT,
  DEFAULT_THRESHOLD,
  REFERENCE_URL_QUERY_STRING_KEY,
  REFERENCE_URL_QUERY_STRING_VALUE,
} = require("./constants");
const getArgs = require("./helpers/getArgs");
const checkCommandValidity = require("./helpers/checkCommandValidity");
const displayHelp = require("./helpers/displayHelp");
const executeCommandOnSingleProject = require("./helpers/executeCommandOnSingleProject");
const createFinalReport = require("./helpers/createFinalReport");
const showTestsStats = require("./commands/showTestsStats");
const openFinalReport = require("./commands/openFinalReport");
const reset = require("./commands/reset");

const {
  csvFileName,
  projectName,
  url,
  referenceUrl,
  viewports,
  threshold,
  debug,
  force,
  commandToRun,
} = getArgs();

(async () => {
  checkCommandValidity(commandToRun);

  if (commandToRun === "help") {
    displayHelp();
    process.exit(0);
  }

  if (commandToRun === "reset") {
    await reset(force);
    process.exit(0);
  }

  if (commandToRun === "showTestsStats") {
    showTestsStats();
    process.exit(0);
  }

  if (commandToRun === "openFinalReport") {
    await openFinalReport();
    process.exit(0);
  }

  if (csvFileName) {
    if (!fs.existsSync(csvFileName)) {
      process.exit(1);
    }

    const projects = await csv().fromFile(csvFileName);

    for (const projectData of projects) {
      if (projectData.referenceUrl === undefined) {
        const url = new URL(projectData.url);
        url.searchParams.append(
          REFERENCE_URL_QUERY_STRING_KEY,
          REFERENCE_URL_QUERY_STRING_VALUE
        );
        projectData.referenceUrl = url.toString();
      }

      if (projectData.viewports === undefined) {
        projectData.viewports = DEFAULT_VIEWPORT;
      }

      if (projectData.threshold === undefined) {
        projectData.threshold = DEFAULT_THRESHOLD;
      } else {
        projectData.threshold = Number(projectData.threshold);
      }

      await executeCommandOnSingleProject(commandToRun, {
        projectName: projectData.projectName || "",
        url: projectData.url,
        referenceUrl: projectData.referenceUrl,
        viewports: projectData.viewports,
        threshold: projectData.threshold,
        debug: false,
        force,
        csvMode: true,
      });
    }
  } else {
    await executeCommandOnSingleProject(commandToRun, {
      projectName,
      url,
      referenceUrl,
      viewports,
      threshold,
      debug,
      force,
    });
  }

  if (commandToRun === "test") {
    createFinalReport();
    showTestsStats();
  }
})();
