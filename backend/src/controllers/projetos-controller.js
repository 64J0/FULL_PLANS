const repository = require("../repositories/projetos-repository");

// List all Projects
exports.listProjeto = async (req, res) => {
  try {
    const data = await repository.listProjeto();
    return res.status(200).send(data);
  } catch (e) {
    return res
      .status(500)
      .send({ mesage: "Falha ao carregar os projetos!", Error: e });
  }
};

// Create a new project
exports.createProjeto = async (req, res) => {
  try {
    const projeto = await repository.createProjeto({
      cliente: req.body.cliente,
      numGRD: req.body.numGRD,
      nomeProjeto: req.body.nomeProjeto,
      disciplinaMestre: req.body.disciplinaMestre,
      numPedido: req.body.numPedido,
      responsavel: req.body.responsavel,
      status: req.body.status,
      infoProjetos: req.body.infoProjetos,
      arquivado: req.body.arquivado
    });
    return res.status(201).send(projeto);
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Falha ao cadastrar o projeto!", Error: e });
  }
};

// update
exports.updateProjeto = async (req, res) => {
  try {
    const projeto = await repository.updateProjeto(req.params.id, req.body);
    return res.status(201).send(projeto);
  } catch (e) {
    return res.status(500).send({
      message: "Falha ao atualizar o projeto!",
      Error: e
    });
  }
};

// delete
exports.deleteProjeto = async (req, res) => {
  try {
    await repository.deleteProjeto(req.params.id);
    return res.status(200).send({
      message: "Projeto removido com sucesso!"
    });
  } catch (e) {
    return res.status(500).send({
      message: "Falha ao remover o projeto!",
      Error: e
    });
  }
};
