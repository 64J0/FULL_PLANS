const AuthenticateUserService = require("../services/user-services/AuthenticateUserService");
const CreateUserService = require("../services/user-services/CreateUserService");
const UpdateUserService = require("../services/user-services/UpdateUserService");
const ListUsersService = require("../services/user-services/ListUsersService");
const DeleteUserService = require("../services/user-services/DeleteUserService");

const AppError = require("../errors/AppError");

exports.verifyUser = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return next(new AppError("O e-mail não foi informado.", 400));
    }

    if (!req.body.password) {
      return next(new AppError("A senha não foi informada.", 400));
    }

    const { auth, token, user } = await AuthenticateUserService.execute(req.body);

    if (!user) {
      return next(new AppError("Autenticação falhou, favor encaminhar as credenciais corretas.", 401));
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
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, permission } = req.body;

    if (!name || !email || !password) {
      return next(new AppError("Algumas informações do usuário não foram informadas, por gentileza confira o formulário.", 400));
    }

    const newUser = await CreateUserService.execute({ name, email, password, permission });

    if (!newUser._id) {
      return next(new AppError(newUser.message, 400));
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
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedUser = await UpdateUserService.execute({
      id,
      body: req.body
    });


    if (!updatedUser._id) {
      return next(new AppError(updatedUser.message, 400));
    }

    return res.status(200).send(updatedUser);
  } catch (e) {
    return res
      .status(500)
      .send({
        message: "Falha ao atualizar o usuário!"
      });
  }
};

// =========================================
// Lista todos os usuários cadastrados
exports.list = async (req, res) => {
  try {
    const userList = await ListUsersService.execute();
    return res.status(200).send(userList);
  } catch (e) {
    return res
      .status(500)
      .send({ mesage: "Falha ao carregar os usuarios!", Error: e });
  }
};

// =========================================
// Deleta um usuário
exports.deleteUser = async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Falha ao deletar o usuário pois o ID não foi informado", 400));
  }

  try {
    await DeleteUserService.execute(req.params);
    return res.status(200).send({ message: "Usuário deletado" });
  } catch {
    return res
      .status(500)
      .send({ message: "Falha ao deletar o usuário!" });
  }
};
