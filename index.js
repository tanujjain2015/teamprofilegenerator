const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generatehtml = require('./lib/renderhtml');
const fs = require('fs');


const managerArr = [];
var uniqueId = 1;

// Function to invoke Manager questions.
const managerPrompt = () => {

    return inquirer.prompt([{
                type: 'confirm',
                name: 'confirmAddManager',
                message: 'Would you like to enter manager details?',
                default: false
            },
            {
                type: 'input',
                name: 'managerName',
                message: "Please enter manager name?",
                validate: function(value) {   //check for valid input. 
                    var pass = value.match(
                        /^[\w\s]+$/
                    );
                    if (pass) {
                        return true;
                    }

                    return 'Please enter a valid employee name?';
                },
                when: ({
                    confirmAddManager
                }) => confirmAddManager
            },
            {
                type: 'input',
                name: 'emailId',
                message: "Please enter manager email-id?",
                validate: function(value) {  //check for valid input. 
                    var pass = value.match(
                        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
                    );
                    if (pass) {
                        return true;
                    }

                    return 'Please enter a valid email address?';
                },
                when: ({
                    confirmAddManager
                }) => confirmAddManager
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "Please enter office Number?",
                validate: function(value) { //check for valid input. 
                    var pass = value.match(
                        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
                    );
                    if (pass) {
                        return true;
                    }

                    return 'Please enter a valid phone number';
                },
                when: ({
                    confirmAddManager
                }) => confirmAddManager
            },
            {
                type: 'confirm',
                name: 'confirmAddUser',
                message: 'Would you like to enter another User?',
                default: false,
                when: ({
                    confirmAddManager
                }) => confirmAddManager
            }
        ])
        .then(answer => {
            if (answer.confirmAddManager) {
                managerArr.push(new Manager(answer.managerName, uniqueId, answer.emailId, answer.officeNumber));
                uniqueId++;
                if (answer.confirmAddUser) {
                    return userPrompt();
                }
                return managerArr;
            }
        });
};

const userPrompt = () => {

    return inquirer.prompt([{
                type: 'list',
                name: 'userType',
                message: 'Please select which type of employee to add?',
                choices: ['Engineer', 'Intern'],
                filter: function(val) {
                    return val.toLowerCase();
                }
            },
            {
                type: 'input',
                name: 'name',
                message: "Please enter employee name?",
                validate: function(value) {
                    var pass = value.match(
                        /^[\w\s]+$/
                    );
                    if (pass) {
                        return true;
                    }

                    return 'Please enter a valid employee name?';
                }
            },
            {
                type: 'input',
                name: 'emailId',
                message: "Please enter employee email-id?",
                validate: function(value) {
                    var pass = value.match(
                        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
                    );
                    if (pass) {
                        return true;
                    }

                    return 'Please enter a valid email address?';
                }
            },
            {
                type: 'input',
                name: 'githubDetail',
                message: "Please enter github detail?",
                validate: function(value) {
                    var pass = value.match(
                        /^[\w\s]+$/
                    );
                    if (pass) {
                        return true;
                    }

                    return 'Please enter valid github detail?';
                },
                when: (answers) => {
                    if (answers.userType == 'engineer') {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'schoolDetail',
                message: "Please enter school detail?",
                validate: function(value) {
                    var pass = value.match(
                        /^[\w\s]+$/
                    );
                    if (pass) {
                        return true;
                    }

                    return 'Please enter valid school detail?';
                },
                when: (answers) => {
                    if (answers.userType == 'intern') {
                        return true;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAddUser',
                message: 'Would you like to add another employee details?',
                default: false
            }
        ])
        .then(answer => {
            if (answer.userType == 'engineer') {
                managerArr.push(new Engineer(answer.name, uniqueId, answer.emailId, answer.githubDetail));
                uniqueId++;
            } else if (answer.userType == 'intern') {
                managerArr.push(new Intern(answer.name, uniqueId, answer.emailId, answer.schoolDetail));
                uniqueId++;
            }
            if (answer.confirmAddUser) {
                return userPrompt();
            }
            return true;
        });
};

// Function to write index HTML file
const writeToFile = (fileName, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                reject(err);
                return null;
            }
            resolve({
                ok: true,
                message: 'File Created'
            });
            return fileName;
        })
    });
};

//Main Init function.
managerPrompt()
    .then((answer) => {
        if (managerArr.length > 0) {
            return generatehtml(managerArr);
        } else return "";
    })
    .then((pageHtml) => {
        if (pageHtml != "") {
            writeToFile('./Index.html', pageHtml);
        }
    });