const chalk = require("chalk");
const log = console.log;

/**
 * Display the help
 */
module.exports = () => {
  log("\n");
  log(chalk.green("backstop"));
  log("A visual regression testing tool based on BackstopJS.");

  log("\n");
  log(chalk.yellow("USAGE:"));
  log("\t npm run backstop -- [PARAMETERS] <COMMAND>");

  log("\n");
  log(chalk.yellow("PARAMETERS:"));
  log(
    "\t" +
      chalk.green("--h") +
      "\t" +
      "(" +
      chalk.yellow("Optional") +
      ") Show this help"
  );

  log(
    "\t" +
      chalk.green("-u") +
      "\t" +
      "(" +
      chalk.red("Required") +
      " if the `-csv` parameter not present) URL to test"
  );

  log(
    "\t" +
      chalk.green("-csv") +
      "\t" +
      "(" +
      chalk.red("Required") +
      " if the `-u` parameter not present) CSV file containing list of urls to test"
  );

  log(
    "\t" +
      chalk.green("-r") +
      "\t" +
      "(" +
      chalk.yellow("Optional") +
      ") Reference url. URL to create the reference screenshot. If not provided default to the URL provided using the `-u` parameter"
  );

  log(
    "\t" +
      chalk.green("-p") +
      "\t" +
      "(" +
      chalk.yellow("Optional") +
      ") Project name. Use only alphanumeric and underscore/dash"
  );

  log(
    "\t" +
      chalk.green("-v") +
      "\t" +
      "(" +
      chalk.yellow("Optional") +
      ") Viewports. Command separated. E.g.: 1920x1800,1280x800"
  );
  log(
    "\t" +
      chalk.green("-t") +
      "\t" +
      "(" +
      chalk.yellow("Optional") +
      ') Threshold. Threshold number (between 0 and 100) which is the amount of difference BackstopJS will tolerate before marking a test screenshot as "failed"'
  );

  log(
    "\t" +
      chalk.green("--force") +
      "\t" +
      "(" +
      chalk.yellow("Optional") +
      ") Force flag. It will force some commands such as the `--deleteProject` and `--reset` and bypass explicit confirmation of the command"
  );

  log("\n");
  log(chalk.yellow("COMMANDS:"));
  log("\t" + chalk.green("--createProject") + "\t\t" + "Create a new project");
  log(
    "\t" +
      chalk.green("--deleteProject") +
      "\t\t" +
      "Delete a project. This will deleted all related files of a project. The `--force` parameter can be used in conjunction to this command to bypass the confirmation prompt"
  );
  log(
    "\t" +
      chalk.green("--reference") +
      "\t\t" +
      "Create the reference screenshot for a project"
  );
  log(
    "\t" +
      chalk.green("--test") +
      "\t\t\t" +
      "Create a test screenshot for a project and compare it with the reference screenshot"
  );

  log(
    "\t" +
      chalk.green("--openReport") +
      "\t\t" +
      "Open the latest test report into a browser"
  );

  log(
    "\t" +
      chalk.green("--showTestsStats") +
      "\t" +
      "This will show the tests stats (whether they failed or passed) in a table on the console"
  );

  log(
    "\t" +
      chalk.green("--openFinalReport") +
      "\t" +
      "This will open the final HTML report (aggregation of all the tests reports) inside the default browser"
  );

  log(
    "\t" +
      chalk.green("--reset") +
      "\t\t\t" +
      "This will delete all the projects as well as the final report. The `--force` parameter can be used in conjunction to this command to bypass the confirmation prompt"
  );

  log("\n");
  log(chalk.yellow("EXAMPLES FOR SINGLE PROJECT:"));
  log(chalk.green("- Create a new project to test the Jetpack.com homepage"));
  log("\t" + "npm run backstop -- -u https://jetpack.com --createProject");

  log("\n");
  log(
    chalk.green(
      "- Create a 2 reference screenshots for viewport 1920x1080 and 1280x800. It will create the project if not already created."
    )
  );
  log(
    "\t" +
      "npm run backstop -- -u https://jetpack.com -r https://jetpack.com/?test_parameter=1 -v 1920x1080,1280x800 --reference"
  );

  log("\n");
  log(
    chalk.green(
      "- Create a 2 test screenshots for viewport 1920x1080 and 1280x800 with a threshold of 5%. It will create the project and also reference screenshots too if not already create"
    )
  );
  log(
    "\t" +
      "npm run backstop -- -u https://jetpack.com -r https://jetpack.com/?test_parameter=1 -v 1920x1080,1280x800 -t 5 --test"
  );

  log("\n");
  log(chalk.green("- Open the latest test report in a browser if exists"));
  log(
    "\t" +
      "npm run backstop -- -u https://jetpack.com -r https://jetpack.com/?test_parameter=1 -v 1920x1080,1280x800 -t 5 --openReport"
  );

  log("\n");
  log(chalk.yellow("EXAMPLES FOR MULTIPLE PROJECT:"));
  log(
    chalk.green(
      "- Create test screenshots for urls provided in the csv file. If the csv contains viewports and threshold, it will use those otherwise use some defaults. It will create the projects and also reference screenshots too."
    )
  );
  log("\t" + "npm run backstop -- -csv urls.csv --test");

  log("\n");
  log(
    chalk.green(
      "- Open the latest test report in a browser, if exists, for each project tested in batch frm the lists of urls provided in the csv file"
    )
  );
  log("\t" + "npm run backstop -- -csv urls.csv --openReport");

  log("\n");
  log(chalk.yellow("OTHER EXAMPLES:"));
  log(
    chalk.green(
      "- Show all the tests stats for all projects in the terminal console"
    )
  );
  log("\t" + "npm run backstop -- --showTestsStats");

  log("\n");
  log(
    chalk.green(
      "- Open the final html report of all the tests for all projects in the default browser. It will also show the tests stats in the terminal console"
    )
  );
  log("\t" + "npm run backstop -- --openFinalReport");

  log("\n");
  log(
    chalk.green("- Delete all the projects as well as the final report files")
  );
  log("\t" + "npm run backstop -- --reset");
};
