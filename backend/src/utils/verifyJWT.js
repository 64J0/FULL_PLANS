// Middleware do Express para verificar a validade do token informado pelo usuário
const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ auth: false, message: "No token provided!" });

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).send({ error: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malformatted" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.send({
        auth: false,
        message: "Failed to authenticate token.",
      });
    }

    // se tudo estiver ok salva no req para usos posteriores
    req.userId = decoded.id;
    return next();
  });

  return { message: "Cannot authenticate the user" };
};
