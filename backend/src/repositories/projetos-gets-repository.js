/*
    Este arquivo foi criado para gerenciar alguns controllers do tipo get, que serão vários inicialmente, sendo posteriormente refatorados para apenas um.
    A arquitetura deste tipo de estrutura é chamada repository pattern.
*/

const mongoose = require('mongoose');
const Projetos = mongoose.model('Projetos');

// Exporta os dados de projetos que foram arquivados
exports.listProjetosArquivados = async () => {
    const res = await Projetos.find({ 'arquivado': true });
    return res;
}