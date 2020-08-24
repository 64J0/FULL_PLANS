const { AuthenticateUserService } = require("../services/AuthenticateUserService");
const { CreateUserService } = require("../services/CreateUserService");
const { UpdateUserService } = require("../services/UpdateUserService");
const { ListUsersService } = require("../services/ListUsersService");
const { DeleteUserService } = require("../services/DeleteUserService");

exports.verifyUser = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({
        auth: false,
        message: "O e-mail não foi informado."
      });
    };

    if (!req.body.password) {
      return res.status(400).send({
        auth: false,
        message: "A senha não foi informada."
      });
    };

    const { auth, token, user } = await AuthenticateUserService(req.body);

    if (!user) {
      return res.status(400).send({
        auth: false,
        message: "Autenticação falhou, favor encaminhar os dados corretos."
      });
    }

    return res.status(202).send({ auth, token, user });
  } catch (err) {
    return res.status(500).send({
      message: "Falha interna do servidor.",
      error: err
    });
  }
};

// =========================================
// Cria um novo usuário que terá acesso ao sistema
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, permission } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({
          message: "Algumas informações do usuário não foram informadas, por gentileza confira o formulário."
        });
    }

    const newUser = await CreateUserService({ name, email, password, permission });

    if (!newUser._id) {
      return res
        .status(400)
        .send({ message: newUser.message });
    }

    return res.status(201).send(newUser);
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message });
  }
};

// =========================================
// Atualiza os dados do usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await UpdateUserService({
      id,
      body: req.body
    });


    if (!updatedUser._id) {
      return res
        .status(400)
        .send({
          message: updatedUser.message
        });
    }

    return res.status(200).send(updatedUser);
  } catch (e) {
    return res
      .status(500)
      .send({
        message: "Falha ao atualizar o usuário!"
      });
  }
}

// =========================================
// Lista todos os usuários cadastrados
exports.list = async (req, res) => {
  try {
    const userList = await ListUsersService();
    return res.status(200).send(userList);
  } catch (e) {
    return res
      .status(500)
      .send({ mesage: "Falha ao carregar os usuarios!", Error: e });
  }
};

// =========================================
// Deleta um usuário
exports.deleteUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "Falha ao deletar o usuário pois o ID não foi informado"
    });
  }

  try {
    await DeleteUserService(req.params);
    return res.status(200).send({ message: "Usuário deletado" });
  } catch {
    return res
      .status(500)
      .send({ message: "Falha ao deletar o usuário!" });
  }
}
