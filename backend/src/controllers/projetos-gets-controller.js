const repository = require('../repositories/projetos-gets-repository');

// Listar os projetos 
exports.listArquivados = async (req, res) => {
    try {
        const data = await repository.listProjetosArquivados();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({ mesage: 'Falha ao carregar os projetos! '});
        console.log(e);
    }
}