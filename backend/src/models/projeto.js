/*
    Chamamos o módulo mongoose, em seguida instanciamos o Schema, um objeto do namespace mongoose. Assim como é feito com o Express.
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Em seguida é modelado o schema de fato, e posteriormente este é exportado pelo mongoose.
*/
const projetoSchema = new Schema({
    nomeEmpresa: {
        type: String,
        required: true,
        trim: true
    },
    projeto: {
        nomeProjeto: String,
        disciplina: String,
        area: String,
        codigo: String,
        projetista: String,
        verificador: String,
        numPedido: String,
        responsavel: String,
        revisao: String,
        numNosso: String,
        numCliente: String,
        formato: String,
        descricao: String,
        objetivo: String,
        tipoEngenharia: String
    }
});

module.exports = mongoose.model('Projetos', projetoSchema);