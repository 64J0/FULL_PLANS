const repository = require("../repositories/users-repository");

const DeleteUserService = async ({ id }) => {
  await repository.delete(id);
}

exports.DeleteUserService = DeleteUserService;