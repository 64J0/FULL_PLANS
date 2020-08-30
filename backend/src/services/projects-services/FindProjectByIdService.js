const repository = require("../../repositories/projects-repository");

async function FindProjectByIdService({ id }) {
  try {
    if (!id) {
      throw new Error("Por gentileza informe o ID do projeto que deseja encontrar!");
    }

    const foundProject = await repository.findProjectById(id);

    return foundProject;
  } catch (error) {
    return error;
  }
}

exports.execute = FindProjectByIdService;