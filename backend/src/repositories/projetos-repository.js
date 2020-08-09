/*
    Este arquivo foi criado para gerenciar os controllers, através de uma arquitetura de programação diferente, chamada repository pattern
*/
const mongoose = require("mongoose");

const Projetos = mongoose.model("Projetos");

exports.listProjeto = async () => {
  const res = await Projetos.find({}).catch((error) => {
    return { error };
  });
  return res;
};

exports.createProjeto = async (data) => {
  try {
    const projeto = new Projetos(data);
    await projeto.save().catch((error) => {
      throw new Error({ error });
    });
    return projeto;
  } catch (err) {
    return err;
  }
};

// POSSIBILIDADES DE MELHORIAS:
// Diminuir a quantidade de requisições ao banco de dados que são feitas
exports.updateProjeto = async (id, data) => {
  await Projetos.findByIdAndUpdate(id, {
    $set: data,
  }).catch((error) => {
    return { error };
  });
  // Retorna o projeto atualizado
  return Projetos.findById(id);
};

exports.deleteProjeto = async (id) => {
  await Projetos.findByIdAndDelete(id).catch((error) => {
    return { error };
  });
  return { message: "Deleted!" };
};

exports.findProjetoById = async (id) => {
  const foundProject = await Projetos.findById(id)
    .catch((error) => {
      return error;
    });

  return foundProject;
}