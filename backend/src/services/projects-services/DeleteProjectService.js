const repository = require("../../repositories/projects-repository");

async function DeleteProjectService({ id }) {
  try {
    if (!id) {
      throw new Error("Por gentileza informe o ID do projeto que deve ser deletado!");
    }

    return repository.deleteProject(id);
  } catch (error) {
    return error;
  }
}

exports.execute = DeleteProjectService;