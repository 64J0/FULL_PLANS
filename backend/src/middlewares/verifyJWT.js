// Middleware do Express para verificar a validade do token informado pelo usuário
const jwt = require("jsonwebtoken");

const AppError = require("../errors/AppError");

exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("No token provided!", 401);
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    throw new AppError("Token error", 401);
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError("Token malformatted", 401);
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      throw new AppError("Failed to authenticate token.", 401);
    }

    // se tudo estiver ok salva no req para usos posteriores
    req.userId = decoded.id;
    return next();
  });

  throw new Error();
};
