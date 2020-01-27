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
            nomeEmpresa: req.body.nomeEmpresa,
            nomeProjeto: req.body.nomeProjeto,
            disciplina: req.body.disciplina,
            area: req.body.area,
            codigo: req.body.codigo,
            projetista: req.body.projetista,
            verificador: req.body.verificador,
            numPedido: req.body.numPedido,
            responsavel: req.body.responsavel,
            revisao: req.body.revisao,
            numNosso: req.body.numNosso,
            numCliente: req.body.numCliente,
            formato: req.body.formato,
            descricao: req.body.descricao,
            objetivo: req.body.objetivo,
            tipoEngenharia: req.body.tipoEngenharia
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
        await repository.updateProjeto(req.params.id, req.body);
        res.status(200).send({
            message: 'Projeto atualizado com sucesso!'
        });
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