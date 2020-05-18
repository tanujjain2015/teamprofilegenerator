const Intern = require("../lib/Intern");

test('creates employee object', () => {
    //console.log(Engineer);
    const intern = new Intern('Tanuj',12345678,"tanujjain2015@gmail","school");
    expect(intern.getName()).toEqual(expect.any(String));
    expect(intern.getEmail()).toEqual(expect.any(String));
    expect(intern.getId()).toEqual(expect.any(Number));
    expect(intern.getSchoolDetail()).toEqual(expect.any(String));
    expect(intern.getRole()).toBe("Intern");
  });