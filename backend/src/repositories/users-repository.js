const mongoose = require("mongoose");

const User = mongoose.model("User");

exports.verifyUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email }).select("+password");
    return user;
  } catch (err) {
    return { message: err };
  }
};

exports.findByEmail = async ({ email }) => {
  const user = await User.findOne({ email });
  return user;
}

exports.findById = async ({ id }) => {
  const user = await User.findById(id);
  return user;
}

exports.create = async ({ name, email, password, permission }) => {
  const user = new User({ name, email, password, permission });
  await user.save();
  user.password = undefined;

  return user;
}

exports.update = async (id, data) => {
  const filter = { _id: id };
  const updatedData = { ...data };
  const updatedUser = await User.findOne(filter);

  Object.assign(updatedUser, updatedData);

  await updatedUser.save();

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
    await User.deleteOne(id);
  } catch (err) {
    throw new Error();
  }
}
