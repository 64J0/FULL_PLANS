const ListProjectsService = require("../services/projects-services/ListProjectsService");
const CreateProjectService = require("../services/projects-services/CreateProjectService");
const UpdateProjectService = require("../services/projects-services/UpdateProjectService");
const DeleteProjectService = require("../services/projects-services/DeleteProjectService");
const FindProjectByIdService = require("../services/projects-services/FindProjectByIdService");



exports.listProjects = async (req, res) => {
  try {
    const projectData = await ListProjectsService.execute();
    return res.status(200).send(projectData);
  } catch (e) {
    return res
      .status(500)
      .send({ mesage: "Falha ao carregar os projetos!", Error: e });
  }
};



exports.createProject = async (req, res) => {
  try {
    const newProject = await CreateProjectService.execute(req.body);
    return res.status(201).send(newProject);
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Falha ao cadastrar o projeto!", Error: e });
  }
};



exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await UpdateProjectService.execute(req.params.id, req.body);
    return res.status(201).send(updatedProject);
  } catch (e) {
    return res.status(500).send({
      message: "Falha ao atualizar o projeto!",
      Error: e,
    });
  }
};



exports.deleteProject = async (req, res) => {
  try {
    await DeleteProjectService.execute({ id: req.params.id });
    return res.status(200).send({
      message: "Projeto removido com sucesso!",
    });
  } catch (e) {
    return res.status(500).send({
      message: "Falha ao remover o projeto!",
      Error: e,
    });
  }
};



exports.findProjectById = async (req, res) => {
  try {
    const foundProject = await FindProjectByIdService.execute({ id: req.params.id });

    if (!foundProject) {
      return res.status(400).send({ message: "Não foi possível encontrar o projeto." });
    }

    return res.status(200).send(foundProject);
  } catch (e) {
    return res.status(500).send({
      message: "Falha ao buscar o projeto pelo id!",
      Error: e,
    })
  }
}
