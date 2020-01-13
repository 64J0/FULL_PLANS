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
    }
});

module.exports = mongoose.model('Projeto', projetoSchema);