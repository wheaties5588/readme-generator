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
            type: "checkbox",
            message: "What languages did you use?",
            name: "languages",
            choices: [ "HTML", "CSS", "Javascript", "Jquery", "Node.js", "React", "SQL" ]
        },
    ])
    .then((res) => {
        console.log(res);
        console.log("Creating README file...");
        createREADMEFile(res);
        
    })
    .catch((err) => {
        console.log(err);
    })
    
    
function createREADMEFile(input) {
    
    // let inputJSON = JSON.stringify(input);
    
    let readmeTitle = `# ${input.title}`;
    
    let readmeDescription = `${input.description}`;
    
    // console.log(readmeDescription);
      
    let completeREADME = readmeTitle + readmeDescription;
    
    const entries = Object.entries(input).join('  \n');

  
    console.log(JSON.stringify(entries));
        
    fs.writeFile("README-test.md", entries, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("README file successfully created!");
        }
    })
}