const repository = require('../repositories/projetos-repository');

//list
exports.listProjeto = async (req, res) => {
    try {
        const data = await repository.listProjeto();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({ mesage: 'Falha ao carregar os projetos! '});
        console.log(e);
    }
};

//create
exports.createProjeto = async (req, res) => {
    try {
        let projeto = await repository.createProjeto({
            cliente: req.body.cliente,
            nomeProjeto: req.body.nomeProjeto,
            disciplinaMestre: req.body.disciplinaMestre,
            numPedido: req.body.numPedido,
            responsavel: req.body.responsavel,
            status: req.body.status,
            infoProjetos: req.body.infoProjetos,
            arquivado: req.body.arquivado
        });
        res.status(201).send(projeto);
    } catch(e) {
        res.status(400).send({ message: 'Falha ao cadastrar o projeto!' });
        console.log(e);
    }
};

//update
exports.updateProjeto = async (req, res) => {
    try {
        let projeto = await repository.updateProjeto(req.params.id, req.body);
        res.status(201).send(projeto);
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao atualizar o projeto!'
        });
        console.log(e);
    }
};

//delete
exports.deleteProjeto = async (req, res) => {
    try {
        await repository.deleteProjeto(req.params.id);
        res.status(200).send({
            message: 'Projeto removido com sucesso!'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao remover o projeto!'
        });
        console.log(e);
    }
};