const ListProjectsService = require("../services/projects-services/ListProjectsService");
const FilterProjectDataByUserPermission = require("../services/projects-services/FilterProjectDataByUserPermission");
const CreateProjectService = require("../services/projects-services/CreateProjectService");
const UpdateProjectService = require("../services/projects-services/UpdateProjectService");
const DeleteProjectService = require("../services/projects-services/DeleteProjectService");
const FindProjectByIdService = require("../services/projects-services/FindProjectByIdService");

const AppError = require("../errors/AppError");


exports.listProjects = async (req, res, next) => {
  try {
    const userId = req.headers.user_id;

    if (!userId) {
      const message = "userId not informed.";
      const statusCode = 401;
      return next(new AppError(message, statusCode));
    }

    const projectData = await ListProjectsService.execute();

    if (!projectData || projectData.length === 0) {
      const message = "Falha ao carregar os projetos. Entre em contato com o administrador do sistema para verificar.";
      const errorCode = 400;
      return next(new AppError(message, errorCode));
    }

    const filteredProjectData = await FilterProjectDataByUserPermission.execute({ userId, projectData });

    return res.status(200).send(filteredProjectData);
  } catch (e) {
    return res
      .status(500)
      .send({ mesage: "Falha ao carregar os projetos!", Error: e });
  }
};



exports.createProject = async (req, res, next) => {
  try {
    const newProject = await CreateProjectService.execute(req.body)
      .catch(() => {
        return next(new AppError("Não foi possível criar o projeto. Entre em contato com o administrador da aplicação para verificar.", 400));
      });

    return res.status(201).send(newProject);
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Falha ao cadastrar o projeto!", Error: e });
  }
};



exports.updateProject = async (req, res, next) => {
  try {
    const updatedProject = await UpdateProjectService.execute(req.params.id, req.body)
      .catch(() => {
        return next(new AppError("Não foi possível atualizar o projeto. Entre em contato com o administrador da aplicação para verificar.", 400));
      });

    return res.status(201).send(updatedProject);
  } catch (e) {
    return res.status(500).send({
      message: "Falha ao atualizar o projeto!",
      Error: e,
    });
  }
};



exports.deleteProject = async (req, res, next) => {
  try {
    await DeleteProjectService.execute({ id: req.params.id })
      .catch(() => {
        return next(new AppError("Não foi possível deletar o projeto. Entre em contato com o administrador da aplicação para verificar.", 400));
      });


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



exports.findProjectById = async (req, res, next) => {
  try {
    const foundProject = await FindProjectByIdService.execute({ id: req.params.id })
      .catch(() => {
        return next(new AppError("Não foi possível encontrar o projeto. Entre em contato com o administrador da aplicação para verificar.", 400));
      });

    if (!foundProject) {
      return res.status(400).send({ message: "O projeto não foi encontrado." });
    }

    return res.status(200).send(foundProject);
  } catch (e) {
    return res.status(500).send({
      message: "Falha ao buscar o projeto pelo id!",
      Error: e,
    });
  }
};
