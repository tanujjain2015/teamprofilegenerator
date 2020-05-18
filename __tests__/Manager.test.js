const Manager = require("../lib/Manager");

test('creates employee object', () => {
    const manager = new Manager('Tanuj',12345678,"tanujjain2015@gmail","6509956084");
    expect(manager.getName()).toEqual(expect.any(String));
    expect(manager.getEmail()).toEqual(expect.any(String));
    expect(manager.getId()).toEqual(expect.any(Number));
    expect(manager.getOfficeNumber()).toEqual(expect.any(String));
    expect(manager.getRole()).toBe("Manager");
  });