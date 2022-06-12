const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, select: false },
  canCook: { type: Boolean, default: false },
  canClean: { type: Boolean, default: false },
  city: { type: String },
  role: { type: String, default: "user" },
  isDeleted: { type: Boolean, default: false },
  profilePic: { type: String, default: "" },
  //partner : object id ref user
  //isworking: true/false default false
  //profilePic: string
});

const UserModel = model("Users", User);

module.exports = UserModel;
