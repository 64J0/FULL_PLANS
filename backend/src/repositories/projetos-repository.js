/*
    Este arquivo foi criado para gerenciar os controllers, através de uma arquitetura de programação diferente, chamada repository pattern
*/

const mongoose = require('mongoose');
const Projetos = mongoose.model('Projetos')

exports.listNomeEmpresa = async () => {
    const res = await Projetos.find({});
    return res;
};

exports.createNomeEmpresa = async data => {
    console.log(data);
    const nomeEmpresa = new Projetos(data);
    await nomeEmpresa.save();
};

exports.updateNomeEmpresa = async (id, data) => {
    await Projetos.findByIdAndUpdate(id, {
        $set: data
    });
};

exports.deleteNomeEmpresa = async id => {
    await Projetos.findOneAndRemove(id);
};