const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  cell: String,
  assunto: String,
  msg: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
