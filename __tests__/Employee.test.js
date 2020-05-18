const Employee = require("../lib/Employee");

test('creates employee object', () => {
    //console.log(Employee);
    const employee = new Employee('Tanuj',12345678,"tanujjain2015@gmail");
    expect(employee.getName()).toEqual(expect.any(String));
    expect(employee.getEmail()).toEqual(expect.any(String));
    expect(employee.getId()).toEqual(expect.any(Number));
    expect(employee.getRole()).toEqual("Employee");
  });