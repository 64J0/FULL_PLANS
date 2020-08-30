const repository = require("../../repositories/users-repository");

const DeleteUserService = async ({ id }) => {
  try {
    const result = await repository.delete(id);
    return result;
  } catch (err) {
    throw new Error();
  }
}

exports.execute = DeleteUserService;