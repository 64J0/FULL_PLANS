const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const repository = require("../../repositories/users-repository");

const AuthenticateUserService = async ({ email, password }) => {
  const user = await repository.findByEmail({ email });

  if (!user) {
    return { auth: false, token: null, user: null };
  }

  const resComparacao = await bcrypt.compare(password, user.password);

  if (!resComparacao) {
    return { auth: false, token: null, user: null };
  }

  const id = user._id;
  const token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 28800, // 8 horas
  });

  user.password = undefined;

  return ({ auth: true, token, user });
}

exports.execute = AuthenticateUserService;