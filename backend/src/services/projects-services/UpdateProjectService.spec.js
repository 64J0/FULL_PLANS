const UpdateProjectService = require("./UpdateProjectService");

jest.mock("../../repositories/projects-repository");

describe("UpdateProjectService", () => {
  it("should update a project with a given ID", async () => {
    const updateProjectDTO = {
      cliente: "FIAT CHRYSLER AUTOMOBILES",
      arquivado: true,
      infoProjetos: [
        {
          _id: 13,
          statusPorcentagem: 100
        },
        {
          _id: 14,
          statusPorcentagem: 100
        }
      ]
    }

    const updatedProject = await UpdateProjectService.execute("2", updateProjectDTO);

    expect(updatedProject).toHaveProperty("cliente", "FIAT CHRYSLER AUTOMOBILES");
    expect(updatedProject).toHaveProperty("arquivado", true);
    expect(updatedProject).toHaveProperty("nomeProjeto", "EMBREAGEM");
    expect(updatedProject.infoProjetos[0]).toHaveProperty("statusPorcentagem", 100);
    expect(updatedProject.infoProjetos[0]).toHaveProperty("_id", 13);
    expect(updatedProject.infoProjetos[1]).toHaveProperty("statusPorcentagem", 100);
    expect(updatedProject.infoProjetos[1]).toHaveProperty("_id", 14);
  });

  it("should not update a project if it's not provided an ID", async () => {
    const updateProjectDTO = {
      cliente: "FIAT CHRYSLER AUTOMOBILES"
    }

    UpdateProjectService.execute("", updateProjectDTO)
      .catch(({ message }) => {
        expect(message).toBe("Informe o ID do projeto que deseja atualizar!");
      });
  });

  it("should not update a project if it's provided an invalid ID", async () => {
    const updateProjectDTO = {
      cliente: "FIAT CHRYSLER AUTOMOBILES"
    }

    const response = await UpdateProjectService.execute("50", updateProjectDTO);

    expect(response).toBeInstanceOf(Error);
  });
})