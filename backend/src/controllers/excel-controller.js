const repository = require('../repositories/excel-repository');

exports.genExcelFile = async (req, res) => {
    try {
        const resposta = await repository.genExcelFile(req.params.id);
        res.status(200).send(resposta);
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao gerar o Excel!'
        });
        console.log(e);
    }
};