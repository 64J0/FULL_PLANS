const usersRepository = require("../repositories/users-repository");
const AppError = require("../errors/AppError");

const verifyEditPermission = async (req, res, next) => {
  const userId = req.headers.user_id;

  if (!userId) {
    const message = "userId not informed.";
    const statusCode = 401;
    return next(new AppError(message, statusCode));
  }

  const foundUser = await usersRepository.findById({ id: userId });

  if (!foundUser._id) {
    const message = "User not found.";
    const statusCode = 401;
    return next(new AppError(message, statusCode));
  }

  switch (foundUser.permission) {
    case "read":
      return userUnauthorized(next);
    case "write":
      return next();
    case "admin":
      return next();
    default:
      return userUnauthorized(next);
  }
};

const userUnauthorized = (next) => {
  const message = "This client ID is associated to an account that doesn't hast the authorization to do this action.";
  const statusCode = 401;
  return next(new AppError(message, statusCode));
};

module.exports = verifyEditPermission;