const DeleteUserService = require("./DeleteUserService");

jest.mock("../../repositories/users-repository");

describe("DeleteUserService", () => {
  it("should delete a user", async () => {
    const userList = await DeleteUserService.execute({
      id: "2"
    });

    expect(userList).toHaveLength(2);
    expect(userList[0]).toHaveProperty("_id", "1");
    expect(userList[1]).toHaveProperty("_id", "3");
  });
});