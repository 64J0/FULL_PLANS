const CreateProjectService = require("./CreateProjectService");

jest.mock("../../repositories/projects-repository");

describe("CreateProjectService", () => {
  it("should create a new project and return it", async () => {
    const projectDTO = {
      cliente: "FULL ENGENHARIA TESTE",
      nomeProjeto: "CreateProjectService",
      disciplinaMestre: "COMPUTAÇÃO",
      numPedido: "9090",
      responsavel: "VINÍCIUS GAJO",
      status: "EXECUTANDO",
      numGRD: "9091"
    };

    const [newProjectsArray, newProject] = await CreateProjectService.execute(projectDTO);

    expect(newProject).toHaveProperty("numGRD", "9091");
    expect(newProjectsArray).toHaveLength(3);
  })
})