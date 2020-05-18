const Engineer = require("../lib/Engineer");

test('creates employee object', () => {
    //console.log(Engineer);
    const engineer = new Engineer('Tanuj',12345678,"tanujjain2015@gmail","tanujjain2015");
    expect(engineer.getName()).toEqual(expect.any(String));
    expect(engineer.getEmail()).toEqual(expect.any(String));
    expect(engineer.getId()).toEqual(expect.any(Number));
    expect(engineer.getGithubDetails()).toEqual(expect.any(String));
    expect(engineer.getRole()).toBe("Engineer");
  });