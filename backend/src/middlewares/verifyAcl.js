const repository = require("../repositories/users-repository");

module.exports = async (req, res, next) => {
  const id = req.body.adminId;
  repository.findById({ id })
    .then((response) => {
      if (!response) {
        return res.status(400).send({ message: "Usuário não encontrado!" });
      }

      if (response.permission !== "admin") {
        return res.status(401).send({ message: "Usuário não autorizado a fazer essa ação!" });
      }

      return next();
    })
    .catch(() => {
      return res.status(500).send({ message: "Problema na operação de verificar a permissão!" });
    })
}