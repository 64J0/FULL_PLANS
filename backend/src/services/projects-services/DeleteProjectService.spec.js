const DeleteProjectService = require("./DeleteProjectService");

jest.mock("../../repositories/projects-repository");

describe("DeleteProjectService", () => {
  it("should delete a user with a given ID", async () => {
    const projectsArray = await DeleteProjectService.execute({ id: "1" });

    expect(projectsArray).toHaveLength(1);
    expect(projectsArray[0]).toHaveProperty("_id", "2");
  });

  it("should not delete a user if no ID is provided", async () => {
    expect(
      await DeleteProjectService.execute({ id: undefined })
    ).toBeInstanceOf(Error);
  });

  it("should not delete a user when a wrong ID is used", async () => {
    const projectsArray = await DeleteProjectService.execute({ id: "3" });

    expect(projectsArray).toHaveLength(2);
    expect(projectsArray[0]).toHaveProperty("_id", "1");
    expect(projectsArray[1]).toHaveProperty("_id", "2");
  });
})