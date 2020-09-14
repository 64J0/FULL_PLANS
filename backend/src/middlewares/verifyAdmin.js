const repository = require("../repositories/users-repository");
const AppError = require("../errors/AppError");

module.exports = async (req, res, next) => {
  try {
    const id = req.body.adminId;

    if (!id) {
      return next(new AppError("O ID do admin não foi informado!", 401));
    }

    repository.findById({ id })
      .then((dbResponse) => {
        if (!dbResponse._id) {
          return next(new AppError("Usuário admin não encontrado!", 401));
        }

        if (dbResponse.permission !== "admin") {
          return next(new AppError("Usuário não autorizado a fazer essa ação!", 401));
        }

        return next();
      })
      .catch(() => {
        throw new Error({ message: "Problema na operação de verificar a permissão!" });
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};