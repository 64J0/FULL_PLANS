/*
    Este arquivo foi criado para gerenciar os controllers, através de uma arquitetura de programação diferente, chamada repository pattern
*/

const mongoose = require('mongoose');
const Projetos = mongoose.model('Projetos')

exports.listProjetos = async () => {
    const res = await Projetos.find({});
    return res;
};

exports.createProjeto = async data => {
    const projeto = new Projetos(data);
    await projeto.save();
};

exports.updateProjeto = async (data) => {
    await Projetos.updateOne({
        nomeEmpresa: data.nomeEmpresa,
        nomeProjeto: data.nomeProjeto
    }, {
        $set: data
    });
    /*
    await Projetos.findByIdAndUpdate(id, {
        $set: data
    });
    */
};

exports.deleteProjeto = async id => {
    await Projetos.findOneAndRemove(id);
};