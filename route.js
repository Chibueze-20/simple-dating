const express = require("express");
const {
  LoginUser,
  getCookingWives,
  getCleaningWives,
  getHouseWives,
  getAllWives,
  getAllUsers,
  getUser,
} = require("./controller");

const route = express.Router();

route.route("/login").post(LoginUser);

route.route("/all").get(getAllUsers);

route.route("/wife/cooking").get(getCookingWives);

route.route("/wife/cleaning").get(getCleaningWives);

route.route("/wife/housewives").get(getHouseWives);

route.route("/wife/all").get(getAllWives);

route.route("/:id").get(getUser);

module.exports = route;
