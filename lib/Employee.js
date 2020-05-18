//Employee class to hold basic employee characters. 
class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }

    //Function to getName.
    getName(){
        return this.name;
    }

    //Function to getId
    getId() {
        return this.id;
    }

    //Function to getEmail
    getEmail() {
        return this.email;
    }

    //Function to getRole. 
    getRole() {
        return "Employee";
    }
}

module.exports = Employee
