const mongoose = require("mongoose");

const User = mongoose.model("User");

exports.verifyUser = async data => {
  try {
    const user = await User.findOne({ email: data.email }).select("+senha");
    return user;
  } catch (err) {
    return { message: err };
  }
};

exports.create = async data => {
  try {
    if (await User.findOne({ email: data.email })) {
      return { message: "E-mail já cadastrado" };
    }
    const usuario = new User(data);
    await usuario.save();
    usuario.senha = undefined;
    return usuario;
  } catch (err) {
    return err;
  }
};

exports.list = async () => {
  try {
    const res = await User.find({});
    return res;
  } catch (err) {
    return err;
  }
};
