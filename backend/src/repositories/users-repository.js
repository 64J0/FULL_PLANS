const mongoose = require("mongoose");

const User = mongoose.model("User");

exports.findByEmail = async ({ email }) => {
  const user = await User
    .findOne({ email })
    .select("+password")
    .catch((error) => {
      return error;
    });
  return user;
}

exports.findById = async ({ id }) => {
  const user = await User
    .findById(id)
    .catch((error) => {
      return error;
    });
  return user;
}

exports.create = async ({ name, email, password, permission }) => {
  const user = new User({ name, email, password, permission });
  await user
    .save()
    .catch((err) => {
      return { message: "Não foi possível salvar o usuário no banco de dados.", err };
    });
  user.password = undefined;

  return user;
}

exports.update = async (id, data) => {
  const filter = { _id: id };
  const updatedData = { ...data };
  const updatedUser = await User
    .findOne(filter)
    .catch((err) => {
      return { message: "Não foi possível encontrar o usuário com o Id informado", err };
    });

  Object.assign(updatedUser, updatedData);

  await updatedUser
    .save()
    .catch((err) => {
      return { message: "Não foi possível salvar o usuário no banco de dados.", err };
    });

  updatedUser.password = undefined;
  return updatedUser;
}

exports.list = async () => {
  try {
    const res = await User.find({});
    return res;
  } catch (err) {
    return err;
  }
};

exports.delete = async (id) => {
  try {
    await User.findOneAndDelete({ _id: id });
  } catch (err) {
    throw new Error("Não foi possível apagar o usuário.");
  }
}
