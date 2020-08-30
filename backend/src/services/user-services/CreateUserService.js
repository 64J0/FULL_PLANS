const repository = require("../../repositories/users-repository");

const CreateUserService = async ({ name, email, password, permission }) => {
  const userAlreadyExists = await repository.findByEmail({ email });

  if (userAlreadyExists) {
    return ({ message: "E-mail já cadastrado. Utilize outro!" });
  }

  const user = await repository.create({
    name,
    email,
    password,
    permission
  });

  return user;
}

exports.execute = CreateUserService;