# Visual Regression Testing Tool

This toolkit allows doing visual regression testing on multiple projects and web pages.

It makes use of [BackstopJS](https://github.com/garris/BackstopJS) and 
was heavily influenced by [Marc Dacanay](https://marcdacanay.com/) [Medium article](https://www.linkedin.com/pulse/backstopjs-deep-dive-marc-roland-dacanay/)
and his [BackstopJS: Visual Regression Test Automation](https://github.com/marcdacz/visual-testing-backstopjs) repository.

## Dependencies
- [Docker](https://www.docker.com/)
- [Nodejs](https://nodejs.org/en/)

## Installation
- Clone this repo
- run `npm install`

## Usage

Run `npm run backstop --` to get the help

### Single URL/project testing

This mode allows testing only 1 specific url at a time and provide more customization of the test scenario(s).

#### Create a new project

One way test an url is to create a project first.

For example:
```
npm run backstop -- -u https://jetpack.com --createProject
```

The creation of a project will copy the [project template files](./templates/project_template) into the [project directory](./projects).

The directory name for the project will be created based on the url. In the example above the project name (and id) will be jetpack_com  

Once the project has been created, settings in the project files can be adjusted for the test. These files will be located inside the 'setup_files' of the project folder.
For the example above the setup files will be located at `projects/jetpack_com/setup_files`.

#### Create reference screenshot(s) for the test

Once the project have been created and customized if required, then reference screenshot(s) for specific viewports need to be created.  

There is the possibility to provide a reference url to take the screenshot(s) to allow more flexibility for the tests. 

For example:

```
npm run backstop -- -u https://jetpack.com -r https://jetpack.com/?jb-disable-modules=critical-css -v 1920x1080,1280x800 --reference
```

This will take a reference screenshot for the 2 viewports (1920x1080 and 1280x800).

The reference screenshot(s) are stored in the `projects/project_name/tests/scenario_label/bitmaps_reference` folder.

**Note**: This command will actually also create a project if it does not exist already, so the above step can be bypassed

#### Take new screenshot(s) and tests them against the reference screenshot(s)

Once reference screenshot(s) for specific viewports have been created, then the next step is to capture new screenshot(s) 
for specific viewports and test them against the reference screenshot(s).

For example:

```
npm run backstop -- -u https://jetpack.com -r https://jetpack.com/?jb-disable-modules=critical-css -v 1920x1080,1280x800 --test
```

This will take a new screenshot for the 2 viewports (1920x1080 and 1280x800) and compare them against the reference screenshots.
It will also generate a JSON report for each test as well as a JSON and HTML report for the latest tests.

The test screenshot(s), diff screenshots and JSON report are stored in the `projects/project_name/tests/scenario_label/bitmaps_test/yyyymmdd-hhmmss/` folder.

**Note**: This command will actually also create a project if it does not exist already and take the reference screenshot(s) as well, so the above 2 steps can be bypassed.

#### Open the latest HTML report

This tool provides a GUI to see the visual difference between screenshot(s), and the reference screenshot(s) for the latest tests.

For example:

```
npm run backstop -- -u https://jetpack.com -r https://jetpack.com/?jb-disable-modules=critical-css -v 1920x1080,1280x800 --openReport
```

This will open the latest HTML report into the default browser.

The latest test HTML and JSON reports are stored in the `projects/project_name/tests/scenario_label/html_report` and `projects/project_name/tests/scenario_label/json_report`folders.

#### Delete a project

A project and its related tests can be deleted.

For example:

```
npm run backstop -- -u https://jetpack.com --deleteProject
```

### Multiple URLs/projects testing

This mode allows testing for multiple urls provided in a CSV file provided through the command line. The CSV file(s) need to be stored at the root of this `visual-regression-testing-tool` folder.

The [sample-csv-file-simple.csv](./sample-csv-file-simple.csv) and [sample-csv-file-advanced.csv](./sample-csv-file-advanced.csv) files provide an example of the structure of the CSV file.

It can look like either:

```
url
https://jetpack.com/
....
```

or

```
url,referenceUrl,viewports,threshold
https://jetpack.com/,https://jetpack.com/?jb-disable-modules=critical-css,"1920x1080,1280x800",10
....
``` 

At the very least the file needs to contain an `url` for each project.

Additionally, a `refrenceUrl`, `viewports` and `threshold` can also be provided. If not provided the tests will run with 
default values for them set in the [constants.csv](./constants.js) file such as:

- `DEFAULT_VIEWPORT`: `1600x1050,1200x800,640x480`
- `DEFAULT_THRESHOLD`: 1 
- `REFERENCE_URL_QUERY_STRING_KEY`: `jb-disable-modules` 
- `REFERENCE_URL_QUERY_STRING_VALUE`: `critical-css`

_Note_: If not provided, the reference url will be build from the `url` with the query string appended to it built using `REFERENCE_URL_QUERY_STRING_KEY` and `REFERENCE_URL_QUERY_STRING_VALUE`.
For example if the `url` is `https://jetpack.com/`, then the generated `referenceUrl` will be `https://jetpack.com/?jb-disable-modules=critical-css`    

_Note_: If multiple are provided for the `viewports` column, they should be comma separated, and the whole string enclosed with double quotes. For example `"1920x1080,1280x800"`.

#### Run the test(s) against the urls list

In order to make the process easier and more automated, the tests for each urls can be launched using the following command:

```
npm run backstop -- --csv sample_csv_file.csv --test
```

This will create test screenshot(s) for urls provided in the csv file. If the csv contains viewports and threshold, it will use those otherwise use some defaults. 
It will create the projects as well as the reference screenshot(s) too.

Each urls will have its projects created as a sub-folder in the [projects](./projects) directory and will have the same structure as 
a project created using the single url command lines described in the previous section.

**Note**

The command:

```
npm run backstop -- --csv sample_csv_file.csv --createProject
```

will create the project sub-folder for each of the urls.

The command:

```
npm run backstop -- --csv sample_csv_file.csv --reference
```

will create the reference screenshot(s) for each urls. It will also create a project for each urls if not already created.

The command:

```
npm run backstop -- --csv sample_csv_file.csv --deleteProject
```

will delete each project sub-folder.
    
### Other commands

#### Show all the tests stats for all projects in the terminal console

The following command will show on the terminal console all the tests stats for all projects.

```
npm run backstop -- --showTestsStats
```

It will look something like:

```
┌──────────────────────────┬───────────────────────────────┬───────────────────────────────────────────────────────────────┬───────────┬────────┐
│                     time │                           url │                                                  referenceUrl │  viewport │ status │
├──────────────────────────┼───────────────────────────────┼───────────────────────────────────────────────────────────────┼───────────┼────────┤
│ 2020-10-27T02:57:38.341Z │ https://jetpack.com/features/ │ https://jetpack.com/features/?jb-disable-modules=critical-css │ 1920x1080 │   pass │
│ 2020-10-27T02:57:38.341Z │ https://jetpack.com/features/ │ https://jetpack.com/features/?jb-disable-modules=critical-css │  1280x800 │   pass │
│ 2020-10-27T02:57:48.971Z │  https://jetpack.com/support/ │  https://jetpack.com/support/?jb-disable-modules=critical-css │ 1920x1080 │   pass │
│ 2020-10-27T02:57:48.971Z │  https://jetpack.com/support/ │  https://jetpack.com/support/?jb-disable-modules=critical-css │  1280x800 │   pass │
│ 2020-10-27T02:57:29.010Z │          https://jetpack.com/ │          https://jetpack.com/?jb-disable-modules=critical-css │ 1920x1080 │   pass │
│ 2020-10-27T02:57:29.010Z │          https://jetpack.com/ │          https://jetpack.com/?jb-disable-modules=critical-css │  1280x800 │   pass │
└──────────────────────────┴───────────────────────────────┴───────────────────────────────────────────────────────────────┴───────────┴────────┘
```

#### Open the final html report of all the tests for all projects

The following command will open the final html report of all the tests for all projects in the default browser. It will also show the tests stats in the terminal console.

```
npm run backstop -- --openFinalReport
```

#### Delete all the projects as well as the final report files

The following command will delete all the projects located in the [projects](./projects) folder 
as well as the final report files ([./final_report/json/jsonFinalReport.json](./final_report/json/jsonFinalReport.json) and [./final_report/html/config.js](./final_report/html/config.js)  which are not version controlled)

```
npm run backstop -- --reset
```
        
 
