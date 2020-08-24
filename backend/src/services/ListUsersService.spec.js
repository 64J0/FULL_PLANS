const service = require("./ListUsersService");

jest.mock("../repositories/users-repository");

describe("ListUsersService", () => {
  it("should list the users list", async () => {
    const userList = await service.ListUsersService();

    expect(userList).toHaveLength(3);
    expect(userList[0]).toHaveProperty("_id", "1");
    expect(userList[1]).toHaveProperty("_id", "2");
    expect(userList[2]).toHaveProperty("_id", "3");
  });
});