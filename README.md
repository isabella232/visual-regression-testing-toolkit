# Visual Regression Testing Toolkit

This is Work In Progress.

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

First you need to create a project for a unique url by running:

```
$ # example for Wordpress.org homepage test
$ npm run backstop -- -u https://wordpress.org -p wordpress_homepage --createProject
``` 

The `-u` parameter is for the `url` of the project.
The `-p` parameter is for the `project` name of the project.

These 2 parameters are required.

The command above will clone the `./projects/template` directory into the `./projects/wordpress_homepage` directory.

Once this command is successful, you need to edit the files into the `./projects/wordpress_homepage` directory and for the time being 
particularly, as a starter, the `./projects/wordpress_homepage/defaultScenarios.js` file.

For example the file will contain the following:

```
module.exports = (options) => {
  return {
    scenarios: [
      {
        label: "Default",
        url: `${options.baseUrl}/`,
        postInteractionWait: options.DEFAULT_DELAY,
        selectors: [".a-custom-selector"],
      },
    ],
  };
};
```

For this specific example you will need to replace `.a-custom-selector` by `#wordpress-org` which is a selector found in the 
DOM of the [https://wordpress.org](https://wordpress.org) homepage. BackstopJS will check if this element is in
the page before taking a screenshot. You can find more details of the configuration for a scenario at [https://github.com/garris/BackstopJS](https://github.com/garris/BackstopJS).

Once the required modification of the project files are done, you have to create a reference screenshot for the comparison test to be possible.

You can create a reference screenshot using the following command:

```
$ npm run backstop -- -u https://wordpress.org -p wordpress_homepage --reference
``` 

Note, the command above will download first the BackstopJS Docker image first before to execute the command. It should only take a few minutes.

Finally, once the command above has been successful you can run a test using the following command:

```
$ npm run backstop -- -u https://wordpress.org -p wordpress_homepage --test
```

This command will take a new screenshot and compares it with the reference screenshots. 
It will also open an HTML report in a local browser. In our example it will look like.

![WordPress.org Visual Regression Test result](https://github.com/davidlonjon/visual-regression-testing-toolkit/blob/master/.github/assets/readme_screenshot1.png?raw=true)

Note that all reference files and screenshots for this example will be save locally in the `./projects/wordpress_homepage/default` directory. 

