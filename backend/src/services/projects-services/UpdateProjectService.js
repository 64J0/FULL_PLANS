const repository = require("../../repositories/projects-repository");

async function UpdateProjectService(id, newProjectData) {
  try {
    if (!id) {
      throw new Error({ message: "Informe o ID do projeto que deseja atualizar!" });
    }

    const updatedProject = repository.updateProject(id, newProjectData);

    return updatedProject;
  } catch (error) {
    return error;
  }
}

exports.execute = UpdateProjectService;