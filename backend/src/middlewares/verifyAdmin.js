const repository = require("../repositories/users-repository");
const AppError = require("../errors/AppError");

module.exports = async (req, res, next) => {
  const id = req.body.adminId;

  if (!id) {
    return next(new AppError("teste", 400));
  }

  repository.findById({ id })
    .then((response) => {
      if (!response) {
        return res.status(400).send({ message: "Usuário admin não encontrado!" });
      }

      if (response.permission !== "admin") {
        return res.status(401).send({ message: "Usuário não autorizado a fazer essa ação!" });
      }

      return next();
    })
    .catch(() => {
      return res.status(500).send({ message: "Problema na operação de verificar a permissão!" });
    });
}