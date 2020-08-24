const service = require("./UpdateUserService");

jest.mock("../repositories/users-repository");

describe("UpdateUserService", () => {
  it("should update a user name, e-mail and permission of the user", async () => {
    const updatedUser = await service.UpdateUserService({
      id: "1",
      body: {
        adminId: "3",
        name: "Novo nome 1",
        email: "novo-email-1@teste.com",
        permission: "write"
      }
    });

    expect(updatedUser).toHaveProperty("name", "Novo nome 1");
    expect(updatedUser).toHaveProperty("email", "novo-email-1@teste.com");
  });

  it("should update a user name and e-mail", async () => {
    const updatedUser = await service.UpdateUserService({
      id: "1",
      body: {
        name: "Novo nome 2",
        email: "novo-email-2@teste.com"
      }
    });

    expect(updatedUser).toHaveProperty("name", "Novo nome 2");
    expect(updatedUser).toHaveProperty("email", "novo-email-2@teste.com");
  });

  it("should not update a user permission if no adminId is provided", async () => {
    const result = await service.UpdateUserService({
      id: "1",
      body: {
        name: "Novo nome 3",
        email: "novo-email-3@teste.com",
        permission: "admin"
      }
    });

    expect(result).toHaveProperty("message");
  });

  it("should not update a user permission if invalid adminId is provided", async () => {
    const result = await service.UpdateUserService({
      id: "1",
      body: {
        adminId: "2",
        name: "Novo nome 4",
        email: "novo-email-4@teste.com",
        permission: "admin"
      }
    });

    expect(result).toHaveProperty("message");
  });

  it("should not update a user without providing ID", async () => {
    const result = await service.UpdateUserService({
      id: "",
      body: {
        name: "Novo nome 5",
        email: "novo-email-4@teste.com"
      }
    });

    expect(result).toHaveProperty("message");
  });

  it("should not update a user to a already used e-mail", async () => {
    const result = await service.UpdateUserService({
      id: "1",
      body: {
        name: "Novo nome 6",
        email: "teste2@teste.com"
      }
    });

    expect(result).toHaveProperty("message");
  });
});