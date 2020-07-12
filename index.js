let inquirer = require('inquirer');
let fs = require('fs');

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "checkbox",
            message: "What languages did you use?",
            name: "languages",
            choices: [ "HTML", "CSS", "Javascript", "Jquery", "Node.js", "React", "SQL" ]
        },
    ])
    .then((res) => {
        console.log(res);
        console.log("Creating README file...");
        let resJSON = JSON.stringify(res);
        fs.writeFile("README-test.md", resJSON, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("README file successfully created!");
            }
        })
    })
    .catch((err) => {
        console.log(err);
    })