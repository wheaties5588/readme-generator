let inquirer = require('inquirer');
let fs = require('fs');

inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title of your project?",
            name: "title"
        },
        {
            type: "input",
            message: "Enter a description for your project:",
            name: "description"
        },
        {
            type: "input",
            message: "Enter installation insructions as a comma separated list:",
            name: "install"
        },
        {
            type: "input",
            message: "Enter usage information for your project:",
            name: "usage"
        },
        {
            type: "input",
            message: "Enter contribution guidelines for your project:",
            name: "contribution"
        },
        {
            type: "input",
            message: "Enter test information for your project:",
            name: "testing"
        },
        {
            type: "input",
            message: "Enter your GitHub Username:",
            name: "github"
        },
        {
            type: "input",
            message: "Enter your email address:",
            name: "email"
        },
        {
            type: "list",
            message: "Which license does this project fall under?",
            name: "license",
            choices: [
                "MIT License",
                "Code Project Open License (CPOL)",
                "Common Development and Distribution License (CDDL)",
                "Microsoft Public License (Ms-PL)",
                "Mozilla Public License 1.1 (MPL 1.1)",
                "Common Public License Version 1.0 (CPL)",
                "Eclipse Public License 1.0",
                "Apache License, Version 2.0"
            ]
        }
    ])
    .then((res) => {
        console.log("Creating README file...");
        createREADMEFile(res);
        
    })
    .catch((err) => {
        console.log(err);
    })
    
    
function createREADMEFile(input) {
    let readmeTitle;
    let readmeDescription;
    const descriptionHead = "## Description";
    let tableOfContents;
    const tocHead = "## Table of Contents";
    let installArr;
    const installHead = "## Installation";
    let readmeUsage;
    const usageHead = "## Usage";
    let readmeContribution;
    const contributionHead = "## Contribution";
    let readmeTest;
    const testingHead = "## Tests";
    let readmeLicence = input.license;
    const licenseHead = "## License";
    let readmeQuestions;
    const questionsHead = "## Questions";
    let completeREADME = [];
    
    // Adding Title
    if (input.title == '') {
        readmeTitle = '# TITLE';
    } else {
        readmeTitle = `# ${input.title}`;
    }
    completeREADME.push(readmeTitle);
    
    
    //Add in license badge here!!
    let badge = `![](https://img.shields.io/badge/license-${readmeLicence.replace(/ /g, "%20")}-blue?style=flat-square)`;
    completeREADME.push(badge);
    
    
    // Adding description
    if (input.description == '') {
        readmeDescription = `${descriptionHead}\n Enter project description here.`;
    } else {
        readmeDescription = `${descriptionHead}\n${input.description}`;
    }
    completeREADME.push(readmeDescription);
    
    
    //Adding Table of Contents
    tableOfContents = `${tocHead}\n* [Installation](#installation)\n* [Usage](#usage)\n* [Contribution](#contribution)\n* [Tests](#tests)\n* [License](#license)\n* [Questions](#questions)\n`;
    completeREADME.push(tableOfContents);
    
    
    //Adding installation instructions
    completeREADME.push(`${installHead}`);
    
    installArr = input.install.split(',').map(item => {
        return `${item.trim()}`;
    });
    
    for (var i = 0; i < installArr.length; i++) {
        completeREADME.push(`${i + 1}. ${installArr[i]}`);
    }
    
    
    //Adding Usage
    if (input.usage == '') {
        readmeUsage = `\n${usageHead}\n Enter project usage here.`;
    } else {
        readmeUsage = `\n${usageHead}\n${input.usage}`;
    }
    completeREADME.push(readmeUsage);
    
    
    //Adding Contributing
    if (input.contribution == '') {
        readmeContribution = `\n${contributionHead}\n Enter project contriburtion information here.`;
    } else {
        readmeContribution = `\n${contributionHead}\n${input.contribution}`;
    }
    completeREADME.push(readmeContribution);
    
    
    //Adding Tests
    if (input.testing == '') {
        readmeTest = `\n${testingHead}\n Enter project testing information here.`;
    } else {
        readmeTest = `\n${testingHead}\n${input.testing}`;
    }
    completeREADME.push(readmeTest);
    
    
    //License info
    readmeLicence = `\n${licenseHead}\nThis project is convered under the ${input.license}.`;
    completeREADME.push(readmeLicence);
    
    
    //Questions section with github link
    readmeQuestions = `\n${questionsHead}\nFor questions about this project, please see my GitHub at [${input.github}](https://github.com/${input.github}), or reach out by email at ${input.email}.`;
    completeREADME.push(readmeQuestions);
    
    
    //Joining the created README Array with a newline separator
    const README = completeREADME.join('\n');
        
    
    //Creating the README
    fs.writeFile("./example/README-example.md", README, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("README file successfully created!");
        }
    });
}