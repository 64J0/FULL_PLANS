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
        trim: true,
        uppercase: true
    },
    nomeProjeto: {
        type: String,
        trim: true,
        uppercase: true
    },
    disciplina: {
        type: String,
        trim: true,
        uppercase: true
    },
    area: {
        type: String,
        trim: true,
        uppercase: true
    },
    codigo: {
        type: String,
        trim: true,
        uppercase: true
    },
    projetista: {
        type: String,
        trim: true,
        uppercase: true
    },
    verificador: {
        type: String,
        trim: true,
        uppercase: true
    },
    numPedido: {
        type: String,
        trim: true,
        uppercase: true
    },
    responsavel: {
        type: String,
        trim: true,
        uppercase: true
    },
    revisao: {
        type: String,
        trim: true,
        uppercase: true
    },
    numNosso: {
        type: String,
        trim: true,
        uppercase: true
    },
    numCliente: {
        type: String,
        trim: true,
        uppercase: true
    },
    formato: {
        type: String,
        trim: true,
        uppercase: true
    },
    descricao: {
        type: String,
        trim: true,
        uppercase: true
    },
    objetivo: {
        type: String,
        trim: true,
        uppercase: true
    },
    tipoEngenharia: {
        type: String,
        trim: true,
        uppercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
/*
const projetoSchema = new Schema({
    nomeEmpresa: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    projeto: {
        nomeProjeto: {
            type: String,
            trim: true,
            uppercase: true
        },
        disciplina: {
            type: String,
            trim: true,
            uppercase: true
        },
        area: {
            type: String,
            trim: true,
            uppercase: true
        },
        codigo: {
            type: String,
            trim: true,
            uppercase: true
        },
        projetista: {
            type: String,
            trim: true,
            uppercase: true
        },
        verificador: {
            type: String,
            trim: true,
            uppercase: true
        },
        numPedido: {
            type: String,
            trim: true,
            uppercase: true
        },
        responsavel: {
            type: String,
            trim: true,
            uppercase: true
        },
        revisao: {
            type: String,
            trim: true,
            uppercase: true
        },
        numNosso: {
            type: String,
            trim: true,
            uppercase: true
        },
        numCliente: {
            type: String,
            trim: true,
            uppercase: true
        },
        formato: {
            type: String,
            trim: true,
            uppercase: true
        },
        descricao: {
            type: String,
            trim: true,
            uppercase: true
        },
        objetivo: {
            type: String,
            trim: true,
            uppercase: true
        },
        tipoEngenharia: {
            type: String,
            trim: true,
            uppercase: true
        },
    }
});
*/

module.exports = mongoose.model('Projetos', projetoSchema);