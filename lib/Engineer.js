//Engineer class to hold basic Engineer characteristics.  This class extends parent Employee class. 
const Employee = require ("./Employee")

class Engineer extends Employee {
    constructor(name,id,email,githubUsername){
        super(name,id,email);
        this.githubUsername = githubUsername;
    }

    //Function to set github details.
    setGithubDetails(githubUsername){
        this.githubUsername = githubUsername;
    }

    //Function to get github details.
    getGithubDetails(){
        return this.githubUsername;
    }

    //Function to get Role details.
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer