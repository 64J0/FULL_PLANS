/*
    Chamamos o módulo mongoose, em seguida instanciamos o Schema, um objeto do namespace mongoose. Assim como é feito com o Express.
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Em seguida é modelado o schema de fato, e posteriormente este é exportado pelo mongoose.
*/

const projetoSchema = new Schema({
    cliente: {
        type: String,
        required: true,
        uppercase: true
    },
    numGRD: {
        type: Number
    },
    nomeProjeto: {
        type: String,
        uppercase: true
    },
    disciplinaMestre: {
        type: String,
        uppercase: true
    },
    numPedido: {
        type: String,
        uppercase: true
    },
    responsavel: {
        type: String,
        uppercase: true
    },
    status: {
        type: String,
        uppercase: true
    },
    infoProjetos: [{
        linkDesenho: {
            type: String
        },
        tipoEngenharia: {
            type: String,
            uppercase: true
        },
        disciplinaDesenho: {
            type: String,
            uppercase: true
        },
        revisao: {
            type: String,
            uppercase: true
        },
        numFull: {
            type: String,
            uppercase: true
        },
        numCliente: {
            type: String,
            uppercase: true
        },
        formato: {
            type: String,
            uppercase: true
        },
        descricao: {
            type: String,
            uppercase: true
        },
        projetistaDesenho: {
            type: String,
            uppercase: true
        },
        verificadorDesenho: {
            type: String,
            uppercase: true
        },
        dataInicio: {
            type: Date,
            default: Date.now
        },
        dataFinal: {
            type: Date,
            default: Date.now
        }
    }],
    arquivado: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Projetos', projetoSchema);