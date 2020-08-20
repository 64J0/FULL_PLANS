const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const repository = require("../repositories/users-repository");

exports.verifyUser = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({ auth: false })
    };

    const user = await repository.verifyUser(req.body);

    if (!user) {
      return res.status(400).send({ auth: false });
    }

    const resComparacao = await bcrypt.compare(req.body.password, user.password);

    if (!resComparacao) return res.status(400).send({ auth: false });

    const id = user._id;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 36000, // 10 horas
    });

    user.password = undefined;

    return res.status(202).send({ auth: true, token, user });
  } catch (err) {
    return res.status(500).send({ message: "Login inválido", Error: err });
  }
};

// =========================================
// Cria um novo usuário que terá acesso ao sistema
exports.createUser = async (req, res) => {
  try {
    const userAlreadyExists = await repository.findByEmail(req.body);

    if (userAlreadyExists) {
      throw new Error("E-mail já cadastrado. Utilize outro!");
    }

    const user = await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      permission: req.body.permission
    });

    return res.status(201).send(user);
  } catch (err) {
    return res
      .status(400)
      .send({ message: err.message });
  }
};

// =========================================
// Atualiza os dados do usuário
exports.updateUser = async (req, res) => {
  try {
    const user = await repository.findById({ id: req.params.id });

    if (!user) {
      throw new Error();
    }

    const { permission } = req.body;

    if (permission && permission !== user.permission) {
      const { adminId } = req.body;

      if (!adminId) {
        throw new Error();
      }

      const adminUser = await repository.findById({ id: adminId });

      if (!adminUser) {
        throw new Error();
      }
    }

    const updatedUser = await repository.update(req.params.id, {
      ...req.body,
    });

    if (!updatedUser) {
      throw new Error();
    }

    return res.status(200).send(updatedUser);
  } catch (e) {
    return res
      .status(400)
      .send({
        message: "Falha ao atualizar o usuário!"
      });
  }
}

// =========================================
// Lista todos os usuários cadastrados
exports.list = async (req, res) => {
  try {
    const data = await repository.list();
    return res.status(200).send(data);
  } catch (e) {
    return res
      .status(500)
      .send({ mesage: "Falha ao carregar os usuarios!", Error: e });
  }
};

// =========================================
// Deleta um usuário
exports.deleteUser = async (req, res) => {
  try {
    await repository.delete(req.params.id);
    return res.status(200).send({ message: "Usuário deletado" });
  } catch {
    return res
      .status(500)
      .send({ message: "Falha ao deletar o usuário!" });
  }
}
