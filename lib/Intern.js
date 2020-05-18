//Intern class to hold basic Intern characteristics.  This class extends parent Employee class. 
const Employee = require ("./Employee")

class Intern extends Employee {
    constructor(name,id,email,school){
        super(name,id,email);
        this.school = school;
    }
    //Function to set school details. 
    setSchoolDetail(school){
        this.school = school;
    }
    //Function to get school details. 
    getSchoolDetail(){
        return this.school;
    }

    //Function to retrieve role. 
    getRole(){
        return "Intern";
    }
}

module.exports = Intern