const repository = require("../../repositories/users-repository");

const ListUsersService = async () => {
  const data = await repository.list();
  return data;
}

exports.execute = ListUsersService;