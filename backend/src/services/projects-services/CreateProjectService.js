const repository = require("../../repositories/projects-repository");

async function CreateProjectService({ cliente, nomeProjeto, disciplinaMestre, numPedido, responsavel, status, numGRD }) {
  const newProject = await repository.createProject({
    cliente,
    nomeProjeto,
    disciplinaMestre,
    numPedido,
    responsavel,
    status,
    numGRD
  });

  if (!newProject) {
    throw new Error();
  }

  return newProject;
}

exports.execute = CreateProjectService;