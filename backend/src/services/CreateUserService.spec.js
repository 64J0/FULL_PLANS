const service = require("./CreateUserService");

jest.mock("../repositories/users-repository");

describe("CreateUserService", () => {
  it("should create a new user", async () => {
    const result = await service.CreateUserService({
      name: "New User",
      email: "new-user@teste.com",
      password: "123456",
      permission: "admin"
    });

    expect(result).toHaveProperty("name", "New User");
    expect(result).toHaveProperty("email", "new-user@teste.com");
    expect(result).toHaveProperty("password", undefined);
    expect(result).toHaveProperty("permission", "admin");
  });

  it("should not create a new user when it's send a e-mail already in the database", async () => {
    const result = await service.CreateUserService({
      name: "New User",
      email: "teste2@teste.com",
      password: "123456",
      permission: "admin"
    });

    expect(result).not.toHaveProperty("name");
    expect(result).toHaveProperty("message");
  });
});