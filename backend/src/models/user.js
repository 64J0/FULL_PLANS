const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    default: "Novo usuário"
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  permission: {
    type: String,
    enum: ["read", "write", "admin"],
    default: "read",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Funcionalidade do Mongoose chamada middlewares (também conhecido como pre e post hooks).
// Neste trecho de código usamos o pre save, ou seja, esse código será automaticamente
// executado sempre antes da função save do Model.
/* eslint func-names: ["error", "never"] */
UserSchema.pre("save", async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  } catch (err) {
    return err;
  }
});

module.exports = mongoose.model("User", UserSchema);
