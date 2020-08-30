const repository = require("../../repositories/users-repository");

const UpdateUserService = async ({ id, body }) => {
  const user = await repository
    .findById({ id });

  if (!user._id) {
    return { message: "O usuário não foi encontrado." };
  }

  const { permission } = body;
  if (permission && permission !== user.permission) {
    if (!body.adminId) {
      return { message: "Informe o ID do usuário administrador responsável pela alteração." };
    }

    const { adminId } = body;

    const adminUser = await repository
      .findById({ id: adminId });

    if (!adminUser._id) {
      return { message: "O usuário administrador não foi encontrado." }
    }

    if (adminUser.permission !== "admin") {
      return { message: "O usuário não tem permissão para efetuar esta alteração." };
    }
  }

  const userByEmail = await repository
    .findByEmail({ email: body.email });

  if (userByEmail && userByEmail._id !== user._id) {
    return { message: "Não é possível alterar o usuário para um e-mail já cadastrado" };
  }

  const updatedUser = await repository
    .update(id, {
      ...body,
    })
    .catch((err) => {
      return { message: err };
    });

  return updatedUser;
}

exports.execute = UpdateUserService;