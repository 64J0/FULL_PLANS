/*
    Este arquivo foi criado para gerenciar os controllers, através de uma arquitetura de programação diferente, chamada repository pattern
*/
const mongoose = require("mongoose");

const Projetos = mongoose.model("Projetos");

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
    return { Error: err };
  }
};

// POSSIBILIDADES DE MELHORIAS:
// Diminuir a quantidade de requisições ao banco de dados que são feitas
exports.updateProjeto = async (id, data) => {
  if (data.arquivado) {
    // data.arquivado = req.body.arquivado === true
    const response = await Projetos.findById(id);
    if (!response.arquivado) {
      // response.arquivado === false
      /* eslint no-param-reassign: ["error", { "props": false }] */
      data.dataArquivado = Date.now();
    }
  }
  await Projetos.findByIdAndUpdate(id, {
    $set: data
  });
  // Retorna o projeto atualizado
  return Projetos.findById(id);
};

exports.deleteProjeto = async id => {
  await Projetos.findByIdAndDelete(id);
  return { message: "Deleted!" };
};
