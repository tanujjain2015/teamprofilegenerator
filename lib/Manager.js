//Manager class to hold basic Manager characteristics.  This class extends parent Employee class. 
const Employee = require ("./Employee")

class Manager extends Employee{
    constructor(name,id,email,officeNumber){
        super(name,id,email);
        this.officeNumber = officeNumber;
    }

    //Function to update office Number 
    setOfficeNumber(officeNumber){
        this.officeNumber = officeNumber;
    }

    //Function to retrieve office Number 
    getOfficeNumber(){
        return this.officeNumber;
    }
    //Override Function to retrieve Role 
    getRole(){
        return "Manager";
    }   

}

module.exports = Manager