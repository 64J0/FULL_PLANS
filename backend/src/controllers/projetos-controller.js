const repository = require('../repositories/projetos-repository');

//list
exports.listNomeEmpresa = async (req, res) => {
    try {
        const data = await repository.listNomeEmpresa();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({ mesage: 'Falha ao carregar os nomes das empresas! '});
    }
};

//create
exports.createNomeEmpresa = async (req, res) => {
    try {
        await repository.createNomeEmpresa({
            nomeEmpresa: req.body.nomeEmpresa
        });
        res.status(201).send({ message: 'Nome da empresa cadastrado com sucesso!' });
    } catch(e) {
        res.status(500).send({ message: 'Falha ao cadastrar o nome da empresa.' })
    }
};

//update
exports.updateNomeEmpresa = async (req, res) => {
    try {
        await repository.updateNomeEmpresa(req.params.id, req.body);
        res.status(200).send({
            message: 'Nome da empresa atualizado com sucesso!'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao atualizar o nome da empresa!'
        });
    }
};

//delete
exports.deleteNomeEmpresa = async (req, res) => {
    try {
        await repository.deleteNomeEmpresa(req.params.id);
        res.status(200).send({
            message: 'Nome da empresa removido com sucesso!'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao remover o nome da empresa.'
        });
    }
};