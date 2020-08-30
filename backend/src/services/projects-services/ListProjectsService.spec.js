const ListProjectsService = require("./ListProjectsService");

jest.mock("../../repositories/projects-repository");

describe("ListProjectsService", () => {
  it("should return an array of project data", async () => {
    const projectData = await ListProjectsService.execute();

    expect(projectData).toBeInstanceOf(Array);
    expect(projectData[0]).toHaveProperty("_id", "1");
    expect(projectData[1]).toHaveProperty("_id", "2");
  })
})