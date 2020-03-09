/*
    Este arquivo foi criado para gerenciar os controllers, através de uma arquitetura de programação diferente, chamada repository pattern
*/

const mongoose = require('mongoose');
const Projetos = mongoose.model('Projetos');

exports.listProjeto = async () => {
    const res = await Projetos.find({});
    return res;
};

exports.createProjeto = async data => {
    try {
        const projeto = new Projetos(data);
        await projeto.save();
        return projeto;
    } catch (err) {
        console.log({ error: err });
    }
    
};

exports.updateProjeto = async (id, data) => {
    await Projetos.findByIdAndUpdate(id, {
        $set: data
    });
    // Retorna o projeto atualizado
    return Projetos.findById(id);
};

exports.deleteProjeto = async id => {
    await Projetos.findByIdAndDelete(id);
};