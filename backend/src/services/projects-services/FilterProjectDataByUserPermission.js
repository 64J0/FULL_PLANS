const usersRepository = require("../../repositories/users-repository");

async function FilterProjectDataByUserPermission({ userId, projectData }) {
  const foundUser = await usersRepository.findById({ id: userId });
  let projectContainsThisUser = false;
  let filteredProjects = [];

  if (foundUser.permission === "admin") {
    return projectData;
  }

  projectData.map((project) => {
    if (project.infoProjetos.length < 1) {
      return true;
    }

    projectContainsThisUser = false;

    project.infoProjetos.map((info) => {
      const usuario = String(foundUser.name).toUpperCase();
      const projetista = String(info.projetistaDesenho).toUpperCase();
      const verificador = String(info.verificadorDesenho).toUpperCase();

      if (projetista === usuario || verificador === usuario) {
        projectContainsThisUser = true;
      }
    });

    if (projectContainsThisUser) {
      filteredProjects.push(project);
    }
  });

  return filteredProjects;
}

exports.execute = FilterProjectDataByUserPermission;