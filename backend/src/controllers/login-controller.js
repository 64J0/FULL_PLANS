const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const repository = require("../repositories/login-repository");

exports.verifyUser = async (req, res) => {
  try {
    // O body da requisição não tem o campo email
    if (!req.body.email) return res.status(400).send({ auth: false });

    const user = await repository.verifyUser(req.body);

    // Usuário não foi encontrado no banco de dados
    if (!user) return res.status(400).send({ auth: false });

    // Comparando a senha armazenada no banco de dados e a informada no body da requisição
    const resComparacao = await bcrypt.compare(req.body.senha, user.senha);
    if (!resComparacao) return res.status(400).send({ auth: false });

    // Usuário encontrado
    const id = user._id;

    // Gera o token de acesso encriptado
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 36000, // 10 horas
    });
    return res.status(200).send({ auth: true, token });
  } catch (err) {
    return res.status(500).send({ message: "Login inválido", Error: err });
  }
};

// =========================================================================
// Cria um novo usuário que terá acesso ao sistema
exports.create = async (req, res) => {
  try {
    const user = await repository.create({
      email: req.body.email,
      senha: req.body.senha,
    });
    return res.status(201).send(user);
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Falha ao cadastrar o usuário!", Error: e });
  }
};

// =========================================================================
// Lista todos os usuários cadastrados
exports.list = async (req, res) => {
  try {
    const data = await repository.list();
    return res.status(200).send(data);
  } catch (e) {
    return res
      .status(500)
      .send({ mesage: "Falha ao carregar os usuarios", Error: e });
  }
};
