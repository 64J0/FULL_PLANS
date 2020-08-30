const FindProjectByIdService = require("./FindProjectByIdService");

jest.mock("../../repositories/projects-repository");

describe("FindProjectByIdService", () => {
  it("should find a project with a valid ID", async () => {
    const foundProject = await FindProjectByIdService.execute({ id: "1" });

    expect(foundProject).toHaveProperty("nomeProjeto", "NOVO AILERON");
  });

  it("should throw an error if no ID is provided", async () => {
    expect(
      await FindProjectByIdService.execute({ id: undefined })
    ).toBeInstanceOf(Error);
  });

  it("should not find nothing if an invalid ID is provided", async () => {
    expect(
      await FindProjectByIdService.execute({ id: "4" })
    ).toBe(undefined);
  });
});