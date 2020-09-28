const projectsRepository = require("../../repositories/projects-repository");

async function ListProjectsService() {
  const projectData = await projectsRepository.listProjects();

  if (!projectData) {
    throw new Error("Não foi possível encontrar os projetos");
  }

  return projectData;
}

exports.execute = ListProjectsService;