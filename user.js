const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, select: false },
  canCook: { type: Boolean, default: false },
  canClean: { type: Boolean, default: false },
  city: { type: String },
  role: { type: String, default: "user" },
  isDeleted: { type: Boolean, default: false },
  isWorking: { type : Boolean, default : false },
  partner: { type : Schema.Types.ObjectId, ref : "User" },
  profilePic: { type : String }
},
{ collection : "User" }
);

const UserModel = model("Users", User);

module.exports = UserModel;
